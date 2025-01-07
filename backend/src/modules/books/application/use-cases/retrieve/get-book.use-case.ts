import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'

import { GetBookDTO } from '../../dtos/get-book.dto'

import { Request } from '@/@core/types/request-with-user-id'
import { BooksRepository } from '@/modules/books/domain/repositories/book.repository'

@Injectable({ scope: Scope.REQUEST })
export class GetBookUseCase {
  constructor(
    private readonly booksRepository: BooksRepository,
    @Inject(REQUEST) private readonly request: Request
  ) {}

  async execute(params: GetBookDTO) {
    const book = await this.booksRepository.findOne({
      where: {
        id: params.bookId,
        userId: this.request.user.id,
      },
    })

    if (!book) throw new NotFoundException('Livro não encontrado')

    return book
  }
}
