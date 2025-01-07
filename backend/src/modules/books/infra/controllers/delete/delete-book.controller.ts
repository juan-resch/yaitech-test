import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { z } from 'zod'

import { DeleteBookUseCase } from '@/modules/books/application/use-cases/delete/delete-book.use-case'
import { AuthGuard } from '@/shared/guards/auth/auth.guard'
import { ZodValidationPipe } from '@/shared/https/pipes/zod-validation-pipe'

const validationPipe = new ZodValidationPipe(z.string().uuid())

@Controller('/books/:id')
@UseGuards(AuthGuard)
@ApiTags('Measurement')
export class DeleteBookController {
  constructor(private readonly deleteBookUseCase: DeleteBookUseCase) {}

  @Delete()
  @HttpCode(HttpStatus.OK)
  async handle(@Param('id', validationPipe) bookId: string) {
    const result = await this.deleteBookUseCase.execute({ bookId })

    return result
  }
}
