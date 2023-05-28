import { Destination } from "src/modules/destination/entity/destination.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateOrderType } from "../types/create-order.type";
import { OrderDestination } from "../entity/order-destination.entity";
import { User } from "src/modules/users/entity/user.entity";
import { ListOrderDestinations } from "../types/list-order-destinations.type";

@EntityRepository(OrderDestination)
export class OrderDestinationRepository extends Repository<OrderDestination> {
  async createOrderUserDestination(
    createOrderType: CreateOrderType,
    user: User,
    destination: Destination,
    va_number: string
  ): Promise<OrderDestination> {
    const { idDestinasi, qty, visitingDate, payment, total, token } =
      createOrderType;

    // search destinasi by id

    // search user
    const userSearch = await User.findOne(user.id);

    const order = this.create();

    order.qty = qty;
    order.destination = destination;
    order.user = userSearch;
    order.visitingDate = visitingDate;
    order.payment = payment;
    order.total = total;
    order.token = token;
    order.va_number = va_number;
    order.status = "unpaid";

    return await order.save();
  }

  async getMyDestinationOrder(user): Promise<ListOrderDestinations> {
    const listOrderDestination = new ListOrderDestinations();

    // temukan order destination yang status unpaid
    const orderDestinationUnpaid = await this.find({
      where: { user: user, status: "unpaid" },
      relations: ["destination"],
    });

    // masukan orderDestinationUnpaid ke ListOrderDestination.unpaid
    listOrderDestination.unpaid = orderDestinationUnpaid;

    // temukan order destination dengan status paid
    const orderDestinationPaid = await this.find({
      where: { user: user, status: "paid" },
      relations: ["destination"],
    });

    // masukan orderDestinationPaid ke ListOrderDestination.paid
    listOrderDestination.paid = orderDestinationPaid;

    // temukan order destination dengan status done
    const orderDestinationVisited = await this.find({
      where: { user: user, status: "visited" },
      relations: ["destination"],
    });

    // masukan orderDestinationVisited ke ListOrderDestination.visited
    listOrderDestination.visited = orderDestinationVisited;

    return listOrderDestination;
  }

  async getOrderDestinationBy(id: string): Promise<OrderDestination> {
    return await this.findOne(id);
  }
}
