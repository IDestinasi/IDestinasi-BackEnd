import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDestinationRepository } from "./repository/order-destination.repository";
import { CreateOrderType } from "./types/create-order.type";
import { User } from "../users/entity/user.entity";
import { PaymentService } from "../payment/payment.service";
import { DestinationRepository } from "../destination/repository/destination.repository";
import { OrderDestination } from "./entity/order-destination.entity";
import { ListOrderDestinations } from "./types/list-order-destinations.type";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderDestinationRepository)
    private readonly orderDestinationRepository: OrderDestinationRepository,

    @InjectRepository(DestinationRepository)
    private readonly destinationRepository: DestinationRepository,

    private readonly paymentService: PaymentService
  ) {}

  async createOrderDestination(
    createOrderType: CreateOrderType,
    user: User
  ): Promise<OrderDestination> {
    const karakter =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";
    for (let i = 0; i < 6; i++) {
      token += karakter.charAt(Math.floor(Math.random() * karakter.length));
    }

    createOrderType.token = token;

    const destination = await this.destinationRepository.findOne(
      createOrderType.idDestinasi
    );

    if (!destination) {
      // return response destination not found
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: "Destination not found",
        },
        HttpStatus.NOT_FOUND
      );
    }

    createOrderType.total = destination.price * createOrderType.qty;

    const transaction: string = await this.paymentService.paymentHandler(
      createOrderType,
      user,
      destination
    );

    return await this.orderDestinationRepository.createOrderUserDestination(
      createOrderType,
      user,
      destination,
      transaction
    );
  }

  async getMyDestinationOrder(user: User): Promise<ListOrderDestinations> {
    return await this.orderDestinationRepository.getMyDestinationOrder(user);
  }

  async updatePaymentOrderDestination(status: any) {
    return await this.orderDestinationRepository.updatePaymentOrderDestination(
      status
    );
  }
}
