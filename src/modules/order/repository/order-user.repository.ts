import { Destination } from "src/modules/destination/entity/destination.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateOrderType } from "../types/create-order.type";
import { Order } from "../entity/order.entity";
import { User } from "src/modules/users/entity/user.entity";

@EntityRepository(Order)
export class OrderUserRepository extends Repository<Order> {
  async createOrderUserDestination(
    createOrderType: CreateOrderType,
    user: User
  ): Promise<void> {
    const { idDestinasi, qty } = createOrderType;

    // search destinasi by id
    const destination = await Destination.findOne(idDestinasi);

    // search user
    const userSearch = await User.findOne(user.id);

    const order = this.create();

    order.qty = qty;
    order.destination = destination;
    order.user = userSearch;

    await order.save();
  }
}
