import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import {
  pageQueryParamValidationPipe,
  pageSizeQueryParamValidationPipe,
} from '@/@core/pagination/pagination'
import { ListBooksUseCase } from '@/modules/books/application/use-cases/retrieve/list-books.use-case'
import { AuthGuard } from '@/shared/guards/auth/auth.guard'

@Controller('/books')
@ApiTags('Books')
@UseGuards(AuthGuard)
export class ListBooksController {
  constructor(private readonly listBooksUseCase: ListBooksUseCase) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async handle(
    @Query('page', pageQueryParamValidationPipe) page: number,
    @Query('pageSize', pageSizeQueryParamValidationPipe) pageSize: number,
    @Query('search') search: string
  ) {
    const result = await this.listBooksUseCase.execute({
      page,
      pageSize,
      search,
    })

    return result
  }
}
