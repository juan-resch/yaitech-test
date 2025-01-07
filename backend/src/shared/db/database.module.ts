import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { EnvModule } from '../env/env.module'
import { EnvService } from '../env/env.service'

import { Book } from '@/modules/books/domain/entities/book.entity'
import { BooksRepository } from '@/modules/books/domain/repositories/book.repository'
import { User } from '@/modules/users/domain/entities/user.entity'
import { UsersRepository } from '@/modules/users/domain/repositories/user.repository'

const entities = [User, Book]
const repositories = [UsersRepository, BooksRepository]

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [EnvService],
      imports: [EnvModule],
      useFactory: (envService: EnvService) => {
        return {
          database: envService.get('DATABASE_NAME'),
          host: envService.get('DATABASE_HOST'),
          port: envService.get('DATABASE_PORT'),
          username: envService.get('DATABASE_USER'),
          password: envService.get('DATABASE_PASSWORD'),
          entities,
          type: 'postgres',
          synchronize: true,
          autoLoadEntities: true,
        }
      },
    }),
  ],
  providers: [...repositories],
  exports: [TypeOrmModule, ...repositories],
})
export class DatabaseModule {}
