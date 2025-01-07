import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_INTERCEPTOR } from '@nestjs/core'

import { CryptographyModule } from './@core/cryptography/modules/cryptography.module'
import { AuthenticationModule } from './modules/authentication/infra/modules/authentication.module'
import { BooksModule } from './modules/books/infra/modules/books.module'
import { IAModule } from './modules/ia/infra/modules/ia.module'
import { UserModule } from './modules/users/infra/modules/user.module'
import { DatabaseModule } from './shared/db/database.module'
import { envSchema } from './shared/env/env'
import { EnvModule } from './shared/env/env.module'
import { ResponseInterceptor } from './shared/web/interceptors/response.interceptor'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
    CryptographyModule,
    DatabaseModule,
    UserModule,
    BooksModule,
    IAModule,
    AuthenticationModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
