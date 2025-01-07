import { Injectable, Logger } from '@nestjs/common'
import { DataSource, EntitySubscriberInterface, InsertEvent } from 'typeorm'

import { Book } from '../entities/book.entity'

import LangChainService from '@/modules/ia/services/langchain.service'

@Injectable()
export class OnBookCreateEvent implements EntitySubscriberInterface<Book> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly langChainService: LangChainService
  ) {
    this.dataSource.subscribers.push(this)
  }

  listenTo() {
    return Book
  }

  async afterInsert(event: InsertEvent<Book>) {
    const book = event.entity

    Logger.log(`Processando livro: ${book.name}`)
    this.langChainService.createPDFContext(book).then(() => {
      Logger.log(`Livro ${book.name} processado`)
    })
  }
}
