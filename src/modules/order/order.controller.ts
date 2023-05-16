import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CreateOrderType } from "./types/create-order.type";
import { SuccessResponse } from "src/interface/success-response.interface";
import { OrderService } from "./order.service";
import { GetUser } from "../auth/get-user.decorator";
import { User } from "../users/entity/user.entity";
import { JwtGuard } from "src/guards/jwt.guard";

@Controller("order")
@UseGuards(JwtGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @Body() createOrderType: CreateOrderType,
    @GetUser() user: User
  ): Promise<void> {
    return this.orderService.createOrder(createOrderType, user);
  }
}
