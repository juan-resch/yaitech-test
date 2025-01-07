import { Module } from '@nestjs/common'

import { CreateBookUseCase } from '../../application/use-cases/create/create-book.use-case'
import { DeleteBookUseCase } from '../../application/use-cases/delete/delete-book.use-case'
import { ChatBookUseCase } from '../../application/use-cases/retrieve/chat-book.use-case'
import { GetBookUseCase } from '../../application/use-cases/retrieve/get-book.use-case'
import { ListBooksUseCase } from '../../application/use-cases/retrieve/list-books.use-case'
import { OnBookCreateEvent } from '../../domain/listeners/on-book-create.event'
import { CreateBookController } from '../controllers/create/create-book.controller'
import { DeleteBookController } from '../controllers/delete/delete-book.controller'
import { ChatBookController } from '../controllers/retrieve/chat-book.controller'
import { GetBookController } from '../controllers/retrieve/get-book.controller'
import { ListBooksController } from '../controllers/retrieve/list-books.controller'

import { IAModule } from '@/modules/ia/infra/modules/ia.module'
import { DatabaseModule } from '@/shared/db/database.module'
import { EnvModule } from '@/shared/env/env.module'

@Module({
  imports: [DatabaseModule, EnvModule, IAModule],
  providers: [
    CreateBookUseCase,
    GetBookUseCase,
    ListBooksUseCase,
    DeleteBookUseCase,
    OnBookCreateEvent,
    ChatBookUseCase,
  ],
  controllers: [
    CreateBookController,
    ListBooksController,
    GetBookController,
    DeleteBookController,
    ChatBookController,
  ],
})
export class BooksModule {}
