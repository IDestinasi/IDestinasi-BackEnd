import { Injectable } from "@nestjs/common";
import { CreateOrderType } from "../order/types/create-order.type";
import axios from "axios";
import { PaymentType } from "./types/payment.type";
import { Destination } from "../destination/entity/destination.entity";
import { User } from "../users/entity/user.entity";
import { response } from "express";

@Injectable()
export class PaymentService {
  async paymentHandler(
    createOrderType: CreateOrderType,
    user: User,
    destination: Destination
  ): Promise<any> {
    // post to localhost:5000/payment

    // find destination by id

    const paymentType = new PaymentType();

    paymentType.payment = createOrderType.payment;
    paymentType.destination = destination;
    paymentType.user = user;
    paymentType.token = createOrderType.token;
    paymentType.total = createOrderType.total;
    paymentType.qty = createOrderType.qty;

    const response = await axios.post("http://localhost:5000/payment", {
      paymentType,
    });

    const merchantId = response.data.data.merchant_id;

    if (paymentType.payment.toLowerCase() == "permata") {
      return {
        va_number: response.data.data.permata_va_number,
        merchantId,
      };
    } else {
      return {
        va_number: response.data.data.va_numbers[0].va_number,
        merchantId,
      };
    }
  }
}
