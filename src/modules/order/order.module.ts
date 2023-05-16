import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { OrderUserRepository } from "./repository/order-user.repository";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([OrderUserRepository])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
