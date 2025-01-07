import { ApiProperty } from '@nestjs/swagger'

export class SigninDTO {
  @ApiProperty()
  username: string

  @ApiProperty()
  password: string
}
