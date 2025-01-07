import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'

import { ChatBookDTO } from '../../dtos/chat-book.dto'

import { Request } from '@/@core/types/request-with-user-id'
import { BooksRepository } from '@/modules/books/domain/repositories/book.repository'
import LangChainService from '@/modules/ia/services/langchain.service'

@Injectable({ scope: Scope.REQUEST })
export class ChatBookUseCase {
  constructor(
    private readonly booksRepository: BooksRepository,
    private readonly langChainService: LangChainService,
    @Inject(REQUEST) private readonly request: Request
  ) {}

  async execute(params: ChatBookDTO) {
    const book = await this.booksRepository.findOneBy({ id: params.bookId })

    if (!book || book.userId !== this.request.user.id)
      throw new NotFoundException('Livro não encontrado')

    const answer = await this.langChainService.askQuestion(
      params.question,
      book
    )

    return {
      answer,
    }
  }
}
