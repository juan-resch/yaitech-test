import { ApiProperty } from '@nestjs/swagger'

export class CreateBookDTO {
  @ApiProperty()
  name: string

  @ApiProperty()
  description: string

  fileUrl: string
}
