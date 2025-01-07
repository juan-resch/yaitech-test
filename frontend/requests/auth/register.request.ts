import { httpClient } from '@/lib/axios'
import { Result } from '@/lib/result'

type Params = {
  name: string
  username: string
  password: string
}

type Response = {
  success: boolean
  result: {
    id: string
    name: string
    username: string
    createdAt: string
    updatedAt: string
  }
}

export async function register(params: Params) {
  try {
    const response = await httpClient.post<Response>('/auth/register', params)

    const result = response.data.result

    return Result.ok(result)
  } catch (err) {
    return Result.withError('Verifique seus dados e tente novamente')
  }
}
