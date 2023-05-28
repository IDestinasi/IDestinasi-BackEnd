import { Destination } from "src/modules/destination/entity/destination.entity";
import { OrderDestination } from "../entity/order-destination.entity";

export class ListOrderDestinations {
  paid: OrderDestination[];
  // belum bayar
  unpaid: OrderDestination[];
  // selesai dikunjungi
  visited: OrderDestination[];
}
