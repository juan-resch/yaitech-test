import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { SigninUseCase } from '../../application/use-cases/signin.use-case'
import { SignUpUseCase } from '../../application/use-cases/signup.use-case'
import { SigninController } from '../controllers/signin.controller'
import { SignUpController } from '../controllers/signup.controller'

import { CryptographyModule } from '@/@core/cryptography/modules/cryptography.module'
import { DatabaseModule } from '@/shared/db/database.module'
import { EnvModule } from '@/shared/env/env.module'
import { EnvService } from '@/shared/env/env.service'

@Module({
  imports: [
    DatabaseModule,
    CryptographyModule,
    JwtModule.registerAsync({
      inject: [EnvService],
      imports: [EnvModule],
      global: true,
      useFactory: (envService: EnvService) => {
        const options = {
          secret: envService.get('JWT_SECRET'),
          signOptions: { expiresIn: '72h' },
        }
        return options
      },
    }),
    EnvModule,
  ],
  providers: [SigninUseCase, SignUpUseCase],
  controllers: [SigninController, SignUpController],
})
export class AuthenticationModule {}
