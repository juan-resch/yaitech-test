import { httpClient } from '@/lib/axios'
import { Result } from '@/lib/result'

type Params = {
  bookId: string
  question: string
}

type Response = {
  success: boolean
  result: {
    answer: string
  }
}

export async function chatBook(params: Params) {
  try {
    const response = await httpClient.post<Response>(`/books/chat`, params)

    const result = response.data

    return Result.ok(result)
  } catch (err) {
    return Result.withError('Usuário ou senha incorretos')
  }
}
