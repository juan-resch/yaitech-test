import { Book as _Book } from '@/types/Book'
import { FC, useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'
import { Check, Copy, Loader, LoaderIcon, MessageCircleIcon, Send, SendHorizonal, Trash } from 'lucide-react'
import { $infra } from '@/requests/infra'
import { Dialog } from './ui/dialog'
import { DialogContent } from '@radix-ui/react-dialog'
import { toast, Toaster } from 'sonner'

type Message = {
  from: 'IA' | 'ME'
  content: string
}

export const Book: FC<{ book: _Book; onClickDelete: () => Promise<void> }> = ({ book, onClickDelete }) => {
  const [isDelete, setIsDelete] = useState(false)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState(false)
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  const [message, setMessage] = useState('')

  const scrollRef = useRef<HTMLDivElement>(null)

  const handleDelete = async () => {
    if (!isDelete) {
      setTimeout(() => {
        setIsDelete(false)
      }, 3000)
      return setIsDelete(true)
    }
    setLoading(true)
    onClickDelete()
    setIsDelete(false)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(book.id)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1500)
  }

  const [messages, setMessages] = useState<Message[]>([
    { from: 'IA', content: 'Olá! Eu sou seu assistente de inteligência artificial. Como posso ajudá-lo hoje?' },
  ])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async (_message: string) => {
    if (_message.length < 3) {
      return toast('Mensagem muito curta')
    }
    setLoadingMessage(true)
    setTimeout(() => {
      setLoadingMessage(false)
    }, 3000)

    let oldMessages = messages

    setMessages([...oldMessages, { content: _message, from: 'ME' }])
    oldMessages = [...oldMessages, { content: _message, from: 'ME' }]
    setMessage('')

    const result = await $infra.books.chat({ bookId: book.id, question: _message })

    if (!result.success) return toast('Houve um erro ao enviar pergunta...', { description: 'Tente novamente' })

    const answer: Message = { content: result.data?.result.answer || 'Houve um erro ao processar pergunta...', from: 'IA' }

    setMessages([...oldMessages, answer])
  }

  return (
    <>
      <Toaster />
      <div className="flex items-center justify-between mt-4 px-4 h-14 transition-all hover:shadow-md hover:z-10 rounded-lg border border-zinc-100">
        <span>{book.name}</span>
        <div className="flex items-center gap-1">
          <Button disabled={loading} onClick={handleDelete} variant={isDelete ? 'destructive' : 'ghost'}>
            {loading ? <LoaderIcon className="animate-spin" color="#444" /> : <Trash color="#444" />}
          </Button>
          <Button onClick={() => setDialogIsOpen(true)} variant={'ghost'}>
            <MessageCircleIcon color="#444" />
          </Button>
          <Button onClick={handleCopy} title="Copiar ID" variant={'ghost'}>
            {copied ? <Check /> : <Copy color="#444" />}
          </Button>
        </div>
      </div>
      {dialogIsOpen && (
        <div
          onClick={() => setDialogIsOpen(false)}
          className="flex flex-col absolute top-0 left-0 justify-center items-center w-screen h-screen bg-black bg-opacity-60"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex overflow-hidden relative flex-col bg-white w-[500px] h-[600px] justify-between rounded-md shadow-md border border-zinc-100 pb-16"
          >
            <div className="flex flex-1 flex-col p-6 gap-4 overflow-y-scroll">
              {messages.map((message, index) => (
                <div
                  className={`rounded-lg  p-2 ${
                    message.from === 'IA'
                      ? 'bg-gradient-to-br from-blue-500 to-purple-500 self-start rounded-bl-none'
                      : 'bg-zinc-900 self-end rounded-br-none'
                  } text-white text-sm font-semibold max-w-[300px]`}
                  key={index}
                >
                  {message.content}
                </div>
              ))}
              <div ref={scrollRef} />
            </div>
            <div className="flex z-20 border-t border absolute bottom-0 w-full h-[64px] bg-white shadow-inner items-center">
              <input
                onKeyDown={(e) => (e.key === 'Enter' ? handleSendMessage(message) : null)}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Pergunte qualquer coisa sobre esse livro"
                className="flex flex-1 px-4 font-semibold"
              />
              {loadingMessage ? (
                <div className="flex rounded-lg cursor-pointer aspect-square items-center justify-center hover:bg-zinc-100 h-full">
                  <Loader className="animate-spin" size={20} color="#aaa" />
                </div>
              ) : (
                <button
                  onClick={() => handleSendMessage(message)}
                  className="flex rounded-lg cursor-pointer aspect-square items-center justify-center hover:bg-zinc-100 h-full"
                >
                  <SendHorizonal className="" size={30} color="#444" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
