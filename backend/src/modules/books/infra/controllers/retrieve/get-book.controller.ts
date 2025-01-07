import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { z } from 'zod'

import { GetBookUseCase } from '@/modules/books/application/use-cases/retrieve/get-book.use-case'
import { AuthGuard } from '@/shared/guards/auth/auth.guard'
import { ZodValidationPipe } from '@/shared/https/pipes/zod-validation-pipe'

const validationPipe = new ZodValidationPipe(z.string().uuid())

@Controller('/books/:id')
@ApiTags('Books')
@UseGuards(AuthGuard)
export class GetBookController {
  constructor(private readonly getBookUseCase: GetBookUseCase) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async handle(@Param('id', validationPipe) bookId: string) {
    const result = await this.getBookUseCase.execute({ bookId })

    return result
  }
}
