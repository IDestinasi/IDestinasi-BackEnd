import { Body, Controller, Post, UseGuards, Get, Put } from "@nestjs/common";
import { CreateOrderType } from "./types/create-order.type";
import { SuccessResponse } from "src/interface/success-response.interface";
import { OrderService } from "./order.service";
import { GetUser } from "../auth/get-user.decorator";
import { User } from "../users/entity/user.entity";
import { JwtGuard } from "src/guards/jwt.guard";
import { OrderDestination } from "./entity/order-destination.entity";
import { Destination } from "../destination/entity/destination.entity";
import { ListOrderDestinations } from "./types/list-order-destinations.type";

@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(JwtGuard)
  async createOrder(
    @Body() createOrderType: CreateOrderType,
    @GetUser() user: User
  ): Promise<OrderDestination> {
    return this.orderService.createOrderDestination(createOrderType, user);
  }

  @Get("destination")
  @UseGuards(JwtGuard)
  async MyDestinationOrder(
    @GetUser() user: User
  ): Promise<ListOrderDestinations> {
    return this.orderService.getMyDestinationOrder(user);
  }

  @Put("payment")
  async UpdatePaymentOrderDestination(@Body() status: any) {
    return this.orderService.updatePaymentOrderDestination(status);
  }

  @Get("order/scan/:id")
  async getScanOrder(@Body() id: any) {
    return this.orderService.getScanOrder(id);
  }
}
