import { Module } from '@nestjs/common'

import LangChainService from '../../services/langchain.service'

import { DatabaseModule } from '@/shared/db/database.module'
import { EnvModule } from '@/shared/env/env.module'
import { EnvService } from '@/shared/env/env.service'

@Module({
  imports: [EnvModule, DatabaseModule],
  exports: [LangChainService],
  providers: [EnvService, LangChainService],
})
export class IAModule {}
