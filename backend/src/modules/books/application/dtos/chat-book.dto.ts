import { ApiProperty } from '@nestjs/swagger'

export class ChatBookDTO {
  @ApiProperty()
  bookId: string

  @ApiProperty()
  question: string
}
