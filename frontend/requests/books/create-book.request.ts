import { httpClient } from '@/lib/axios'
import { Result } from '@/lib/result'

type Params = {
  name: string
  description: string
  file: File
}

type Response = {
  success: boolean
  result: {
    id: string
    name: string
    fileUrl: string
    createdAt: string
    updatedAt: string
  }
}

export async function createBook(params: Params) {
  try {
    const formData = new FormData()
    formData.append('name', params.name)
    formData.append('description', params.description)
    formData.append('file', params.file)

    const response = await httpClient.post<Response>('/book', formData)

    const result = response.data

    return Result.ok(result)
  } catch (err) {
    return Result.withError('Usuário ou senha incorretos')
  }
}
