import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'

import { DeleteBookDTO } from '../../dtos/delete-book.dto'

import { Request } from '@/@core/types/request-with-user-id'
import { BooksRepository } from '@/modules/books/domain/repositories/book.repository'

@Injectable({ scope: Scope.REQUEST })
export class DeleteBookUseCase {
  constructor(
    private readonly booksRepository: BooksRepository,
    @Inject(REQUEST) private readonly request: Request
  ) {}

  async execute(params: DeleteBookDTO) {
    const book = await this.booksRepository.findOneBy({
      id: params.bookId,
    })

    if (!book || book?.userId !== this.request.user.id)
      throw new NotFoundException('Livro não encontrado')

    await this.booksRepository.delete(book.id)

    return { success: true, deletedBook: book }
  }
}
