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

  @Column({
    nullable: true,
    default: null,
  })
  qty: number;

  @Column({
    nullable: true,
    default: null,
  })
  payment: string;

  @Column({
    nullable: true,
    default: null,
  })
  order_id: string;

  @ManyToOne(() => User, (user) => user.orderAdditonal)
  user: User;
}
