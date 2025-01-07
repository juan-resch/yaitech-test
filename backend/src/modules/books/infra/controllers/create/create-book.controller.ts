import { extname } from 'path'

import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiTags } from '@nestjs/swagger'
import { diskStorage } from 'multer'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'

import { CreateBookDTO } from '@/modules/books/application/dtos/create-book.dto'
import { CreateBookUseCase } from '@/modules/books/application/use-cases/create/create-book.use-case'
import { AuthGuard } from '@/shared/guards/auth/auth.guard'
import { ZodValidationPipe } from '@/shared/https/pipes/zod-validation-pipe'

const bodySchema = z.object({
  name: z.string(),
  description: z.string(),
})

const validationPipe = new ZodValidationPipe(bodySchema)

@Controller('/book')
@UseGuards(AuthGuard)
@ApiTags('Books')
export class CreateBookController {
  constructor(private readonly createBookUseCase: CreateBookUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = `${uuidv4()}${extname(file.originalname)}`

          // const fileUrl = getFileUrl(uniqueSuffix)

          callback(null, uniqueSuffix)
        },
      }),
      limits: { fileSize: 20 * 1024 * 1024 },
    })
  )
  async handle(
    @Body(validationPipe) data: CreateBookDTO,
    @UploadedFile() file: Express.Multer.File
  ) {
    const fileUrl = file.filename

    const result = await this.createBookUseCase.execute({ ...data, fileUrl })

    return result
  }
}
