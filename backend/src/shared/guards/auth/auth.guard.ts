import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UsersRepository } from '@/modules/users/domain/repositories/user.repository'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UsersRepository
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<any>()
    let token = null

    if (request?.headers?.authorization) {
      token = request?.headers?.authorization.split(' ')[1]
    }

    if (!token) throw new UnauthorizedException('Invalid JWT')

    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env['JWT_SECRET'],
      })

      const id = decoded?.id

      if (!id) throw new UnauthorizedException('Invalid JWT')

      const user = await this.userRepository.findOneBy({ id })

      if (!user) throw new UnauthorizedException('Invalid JWT')

      request.user = {
        id: user.id,
      }

      return true
    } catch (err) {
      throw new UnauthorizedException('Invalid JWT')
      // console.error(err)
    }
  }
}
