import { APIGatewayEvent, Context, Callback, Handler, SQSEvent } from 'aws-lambda';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { DataReplicationLambdaService } from './data-replication-lambda/data-replication-lambda.service';

async function bootstrap(event: any, context: Context) {

  // * create NestJs application
  const app = await NestFactory.create(AppModule);
  const service = app.get(DataReplicationLambdaService);

  // * process event
  console.log('>>> siproad-products-lambda: starting process... event=', JSON.stringify(event));

  return service.processEvent(event)
  .then( (response) => {
    console.log('<<< siproad-products-lambda: executed');
    return response;
  })
  .catch((error) => {
    console.log('siproad-products-lambda: processing error', error);
    throw error;
  });
  
}

export const handler: Handler = bootstrap;