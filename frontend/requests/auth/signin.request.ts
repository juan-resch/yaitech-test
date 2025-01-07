import { httpClient } from '@/lib/axios'
import { Local } from '@/lib/local'
import { Result } from '@/lib/result'

type Params = {
  username: string
  password: string
}

type Response = {
  success: boolean
  result: {
    token: string
    user: {
      id: string
      name: string
      username: string
      createdAt: string
      updatedAt: string
    }
  }
}

export async function signIn(params: Params) {
  try {
    const response = await httpClient.post<Response>('/auth', params)

    const data = response.data

    httpClient.defaults.headers['Authorization'] = `Bearer ${response.data.result.token}`

    Local.setAccessToken(data.result.token)

    return Result.ok(data)
  } catch (err) {
    return Result.withError('Usuário ou senha incorretos')
  }
}
