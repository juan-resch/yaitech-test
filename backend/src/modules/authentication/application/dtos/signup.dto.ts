import { ApiProperty } from '@nestjs/swagger'

export class SignUpDTO {
  @ApiProperty()
  name: string

  @ApiProperty()
  username: string

  @ApiProperty()
  password: string
}
