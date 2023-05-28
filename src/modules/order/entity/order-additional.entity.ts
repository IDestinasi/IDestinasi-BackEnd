import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrderDestination } from "./order-destination.entity";
import { User } from "src/modules/users/entity/user.entity";

@Entity()
export class OrderAdditonal extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  qty: number;

  @Column()
  payment: string;

  @Column()
  order_id: string;

  @ManyToOne(() => User, (user) => user.orderAdditonal)
  user: User;
}
