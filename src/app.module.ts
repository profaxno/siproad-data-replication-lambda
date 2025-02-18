import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { config } from './config/app.config';
import { DataReplicationLambdaModule } from './data-replication-lambda/data-replication-lambda.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config]
    }),
    DataReplicationLambdaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
