import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { z } from 'zod'

import { SigninDTO } from '../../application/dtos/signin.dto'
import { SigninUseCase } from '../../application/use-cases/signin.use-case'

import { ZodValidationPipe } from '@/shared/https/pipes/zod-validation-pipe'

const bodySchema = z.object({
  username: z.string(),
  password: z.string(),
})

const validationPipe = new ZodValidationPipe(bodySchema)

@Controller('/auth')
@ApiTags('Auth')
export class SigninController {
  constructor(private readonly signinUseCase: SigninUseCase) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Ok' })
  async handle(@Body(validationPipe) data: SigninDTO) {
    const result = await this.signinUseCase.execute(data)

    return result
  }
}
