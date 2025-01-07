import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { z } from 'zod'

import { ChatBookDTO } from '@/modules/books/application/dtos/chat-book.dto'
import { ChatBookUseCase } from '@/modules/books/application/use-cases/retrieve/chat-book.use-case'
import { AuthGuard } from '@/shared/guards/auth/auth.guard'
import { ZodValidationPipe } from '@/shared/https/pipes/zod-validation-pipe'

const bodySchema = z.object({
  question: z.string(),
  bookId: z.string().uuid(),
})

const validationPipe = new ZodValidationPipe(bodySchema)

@Controller('/books/chat')
@ApiTags('Books')
@UseGuards(AuthGuard)
export class ChatBookController {
  constructor(private readonly chatBookUseCase: ChatBookUseCase) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async handle(@Body(validationPipe) body: ChatBookDTO) {
    const result = await this.chatBookUseCase.execute(body)

    return result
  }
}
