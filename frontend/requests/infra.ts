import { authRequests } from './auth'
import { booksRequest } from './books'

export const $infra = {
  auth: authRequests,
  books: booksRequest,
}
