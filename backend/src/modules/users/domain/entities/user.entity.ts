import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Book } from '@/modules/books/domain/entities/book.entity'

type CreateProps = {
  name: string
  username: string
  password: string
}

type PublicUser = {
  id: string
  name: string
  username: string
  createdAt: Date
  updatedAt: Date
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ unique: true })
  username: string

  @Column()
  password: string

  @OneToMany(() => Book, (book) => book.user)
  books: Book[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  static create(props: CreateProps) {
    const item = new this()

    Object.keys(props).forEach((key) => (item[key] = props[key]))

    return item
  }

  static toPublic(user: User): PublicUser {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}
