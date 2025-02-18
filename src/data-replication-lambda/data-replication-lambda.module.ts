import { Module } from '@nestjs/common';

import { DataReplicationLambdaService } from './data-replication-lambda.service';
import { ProductsModule } from 'src/products/products.module';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [ProductsModule, OrdersModule],
  controllers: [],
  providers: [DataReplicationLambdaService],
})
export class DataReplicationLambdaModule {}
