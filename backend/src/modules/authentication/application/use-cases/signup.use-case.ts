import { ConflictException, Injectable } from '@nestjs/common'

import { SignUpDTO } from '../dtos/signup.dto'

import { HashGenerator } from '@/@core/cryptography/hash-generator'
import { User } from '@/modules/users/domain/entities/user.entity'
import { UsersRepository } from '@/modules/users/domain/repositories/user.repository'

@Injectable()
export class SignUpUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashGenerator: HashGenerator
  ) {}

  async execute(params: SignUpDTO) {
    const existsUser = await this.usersRepository.findOneBy([
      { username: params.username },
    ])

    if (existsUser) throw new ConflictException('Usuario já existe')

    const encryptedPassword = await this.hashGenerator.hash(params.password)

    const user = User.create({
      ...params,
      password: encryptedPassword,
    })

    const createdUser = await this.usersRepository.save(user)

    return User.toPublic(createdUser)
  }
}
