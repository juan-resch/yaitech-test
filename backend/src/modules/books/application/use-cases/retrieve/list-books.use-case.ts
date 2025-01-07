import { Inject, Injectable, Scope } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { Like } from 'typeorm'

import { ListBooksDTO } from '../../dtos/list-books.dto'

import { Request } from '@/@core/types/request-with-user-id'
import { BooksRepository } from '@/modules/books/domain/repositories/book.repository'
import { getSkipTake } from '@/shared/utils/get-skip-take'

@Injectable({ scope: Scope.REQUEST })
export class ListBooksUseCase {
  constructor(
    private readonly booksRepository: BooksRepository,
    @Inject(REQUEST) private readonly request: Request
  ) {}

  async execute(params: ListBooksDTO) {
    const skipTake = getSkipTake(params)

    const where: Record<string, any> = {
      userId: this.request.user.id,
    }

    if (params.search) {
      where.name = Like(`%${params.search}%`)
    }

    const [books, total] = await this.booksRepository.findAndCount({
      ...skipTake,
      where,
    })

    return {
      data: books,
      total,
      page: params.page,
      pageSize: params.pageSize,
      totalPages: Math.ceil(total / params.pageSize),
    }
  }
}
