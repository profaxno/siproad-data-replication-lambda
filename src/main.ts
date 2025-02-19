import { APIGatewayEvent, Context, Callback, Handler, SQSEvent } from 'aws-lambda';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { DataReplicationLambdaService } from './data-replication-lambda/data-replication-lambda.service';

async function bootstrap(event: any, context: Context) {

  // * create NestJs application
  const app = await NestFactory.create(AppModule);
  const service = app.get(DataReplicationLambdaService);

  const env = process.env.ENV.padEnd(30, ' ');

  console.log(`
╔═══════════════════════════════════════╗
║ @org: Profaxno Company                ║
║ @app: siproad-data-replication-lambda ║
║ @env: ${env} ║
╚═══════════════════════════════════════╝
`)

  // * process event
  console.log(`>>> siproad-data-replication-lambda: starting process... event=${JSON.stringify(event)}`);

  return service.processEvent(event)
  .then( (response) => {
    console.log('<<< siproad-data-replication-lambda: executed');
    return response;
  })
  .catch((error) => {
    console.log('siproad-data-replication-lambda: processing error', error);
    throw error;
  });
  
}

export const handler: Handler = bootstrap;