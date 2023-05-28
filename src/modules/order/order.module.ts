import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { OrderDestinationRepository } from "./repository/order-destination.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaymentModule } from "../payment/payment.module";
import { DestinationRepository } from "../destination/repository/destination.repository";

@Module({
  imports: [
    PaymentModule,
    TypeOrmModule.forFeature([DestinationRepository]),
    TypeOrmModule.forFeature([OrderDestinationRepository]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
