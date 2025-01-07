import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { OpenAI, OpenAIEmbeddings } from '@langchain/openai'
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters'
import { Injectable, NotFoundException } from '@nestjs/common'
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents'
import { createRetrievalChain } from 'langchain/chains/retrieval'
import 'pdf-parse'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'

import { Book } from '@/modules/books/domain/entities/book.entity'
import { EnvService } from '@/shared/env/env.service'

const systemTemplate = [
  `Você é um assistente especializado em responder perguntas. `,
  `Use os seguintes trechos de contexto recuperados para responder `,
  `à pergunta. Caso não saiba a resposta, diga que não sabe. `,
  `Responda com, no máximo, três frases e mantenha a resposta objetiva.`,
  `\n\n`,
  `{context}`,
].join('')

@Injectable()
export default class LangChainService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private booksRetrievers = new Map<string, any>()

  constructor(private readonly envService: EnvService) {
    this.textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    })

    this.llm = new OpenAI({
      openAIApiKey: envService.get('OPENAI_API_KEY'),
    })
  }

  llm: OpenAI
  textSplitter: RecursiveCharacterTextSplitter

  chunkText(text: string, chunkSize = 200): string[] {
    return text.match(new RegExp(`.{1,${chunkSize}}`, 'g')) || []
  }

  async createPDFContext(book: Book) {
    try {
      const loader = new PDFLoader(`uploads/${book.fileUrl}`)
      const docs = await loader.load()
      const splits = await this.textSplitter.splitDocuments(docs)

      const vectorstore = await MemoryVectorStore.fromDocuments(
        splits,
        new OpenAIEmbeddings({
          model: 'text-embedding-3-small',
        })
      )

      const retriever = vectorstore.asRetriever()

      this.booksRetrievers.set(book.id, retriever)
    } catch (err) {
      throw new NotFoundException(
        `Arquivo do livro com ID ${book.id} não encontrado.`
      )
    }
  }

  async askQuestion(question: string, book: Book) {
    const retriever = this.booksRetrievers.get(book.id)
    if (!retriever) {
      await this.createPDFContext(book)
    }

    const ragChain = await createRetrievalChain({
      retriever,
      combineDocsChain: await createStuffDocumentsChain({
        llm: this.llm,
        prompt: ChatPromptTemplate.fromMessages([
          ['system', systemTemplate],
          ['human', '{input}'],
        ]),
      }),
    })

    const results = (await ragChain.invoke({ input: question })) as {
      answer: string
    }

    const cleanAnswer = results.answer.replace(/\n/g, ' ')
    return cleanAnswer
  }
}
