import { httpClient } from '@/lib/axios'
import { Result } from '@/lib/result'

type Params = {
  bookId: string
}

type Response = {
  success: boolean
  result: {
    id: string
    name: string
    fileUrl: string
    userId: string
    createdAt: string
    updatedAt: string
  }
}

export async function deleteBook(params: Params) {
  try {
    const response = await httpClient.delete<Response>(`/books/${params.bookId}`)

    const result = response.data

    return Result.ok(result)
  } catch (err) {
    return Result.withError('Usuário ou senha incorretos')
  }
}
