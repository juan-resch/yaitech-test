import { httpClient } from '@/lib/axios'
import { Result } from '@/lib/result'

type Params = {
  search?: string
}

type Response = {
  success: boolean
  result: {
    data: Array<{
      id: string
      userId: string
      name: string
      fileUrl: string
      createdAt: string
      updatedAt: string
    }>
    total: number
    page: number
    pageSize: number
    totalPages: number
  }
}

export async function listBooks(params: Params) {
  try {
    const response = await httpClient.get<Response>('/books', {
      params: {
        search: params.search,
        pageSize: 100,
      },
    })

    const result = response.data

    return Result.ok(result)
  } catch (err) {
    return Result.withError('Usuário ou senha incorretos')
  }
}
