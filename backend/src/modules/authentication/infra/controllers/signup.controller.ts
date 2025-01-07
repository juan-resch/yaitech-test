import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { z } from 'zod'

import { SignUpDTO } from '../../application/dtos/signup.dto'
import { SignUpUseCase } from '../../application/use-cases/signup.use-case'

import { ZodValidationPipe } from '@/shared/https/pipes/zod-validation-pipe'

const bodySchema = z.object({
  name: z.string(),
  username: z.string(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

const validationPipe = new ZodValidationPipe(bodySchema)

@Controller('/auth/register')
@ApiTags('Auth')
export class SignUpController {
  constructor(private readonly signUpUseCase: SignUpUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ description: 'Created' })
  async handle(@Body(validationPipe) data: SignUpDTO) {
    const result = await this.signUpUseCase.execute(data)

    return result
  }
}
