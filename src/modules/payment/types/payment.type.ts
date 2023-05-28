import { Additional } from "src/modules/additional/entity/additional.entity";
import { Destination } from "src/modules/destination/entity/destination.entity";
import { User } from "src/modules/users/entity/user.entity";

export class PaymentType {
  payment: string;

  destination: Destination;

  additional: Additional;

  token: string;

  user: User;

  total: number;

  qty: number;
}
