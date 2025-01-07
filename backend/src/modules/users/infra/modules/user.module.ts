import { Module } from '@nestjs/common'

import { DatabaseModule } from '@/shared/db/database.module'
import { EnvModule } from '@/shared/env/env.module'

@Module({
  imports: [DatabaseModule, EnvModule],
  providers: [],
  controllers: [],
})
export class UserModule {}
