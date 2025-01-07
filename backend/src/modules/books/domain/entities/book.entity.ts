import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { User } from '@/modules/users/domain/entities/user.entity'

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  fileUrl: string

  @ManyToOne(() => User, (user) => user.books)
  @JoinColumn({ name: 'userId' })
  user: User

  @Column()
  userId: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
