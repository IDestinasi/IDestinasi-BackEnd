import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderUserRepository } from "./repository/order-user.repository";
import { CreateOrderType } from "./types/create-order.type";
import { User } from "../users/entity/user.entity";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderUserRepository)
    private readonly orderUserRepository: OrderUserRepository
  ) {}

  async createOrder(
    createOrderType: CreateOrderType,
    user: User
  ): Promise<void> {
    return await this.orderUserRepository.createOrderUserDestination(
      createOrderType,
      user
    );
  }
}
