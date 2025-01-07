import { Injectable, ForbiddenException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { SigninDTO } from '../dtos/signin.dto'

import { HashComparer } from '@/@core/cryptography/hash-comparer'
import { User } from '@/modules/users/domain/entities/user.entity'
import { UsersRepository } from '@/modules/users/domain/repositories/user.repository'

@Injectable()
export class SigninUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly hashComparer: HashComparer
  ) {}

  async execute(params: SigninDTO) {
    const user = await this.usersRepository.findOneBy({
      username: params.username,
    })

    const err = new ForbiddenException('Usuário ou senha inválidos')

    if (!user) throw err

    const isValidPassword = await this.hashComparer.compare(
      params.password,
      user.password
    )

    if (!isValidPassword) throw err

    const ONE_DAY = 60 * 60 * 24

    const token = this.jwtService.sign(
      { username: user.username, id: user.id },
      { expiresIn: ONE_DAY }
    )

    return { token, user: User.toPublic(user) }
  }
}
