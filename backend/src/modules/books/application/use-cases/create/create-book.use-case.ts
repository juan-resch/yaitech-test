import { Inject, Injectable, Scope } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'

import { CreateBookDTO } from '../../dtos/create-book.dto'

import { Request } from '@/@core/types/request-with-user-id'
import { BooksRepository } from '@/modules/books/domain/repositories/book.repository'

@Injectable({ scope: Scope.REQUEST })
export class CreateBookUseCase {
  constructor(
    private readonly booksRepository: BooksRepository,
    @Inject(REQUEST) private readonly request: Request
  ) {}

  async execute(params: CreateBookDTO) {
    const book = this.booksRepository.create({
      ...params,
      userId: this.request.user.id,
    })
    const createdBook = await this.booksRepository.save(book)

    return createdBook
  }
}
