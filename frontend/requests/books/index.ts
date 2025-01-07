import { chatBook } from './chat-book.request'
import { createBook } from './create-book.request'
import { deleteBook } from './delete-book'
import { getBook } from './get-book.request'
import { listBooks } from './list-books.request'

export const booksRequest = {
  create: createBook,
  list: listBooks,
  get: getBook,
  delete: deleteBook,
  chat: chatBook,
}
