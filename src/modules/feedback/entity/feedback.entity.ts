import { Destination } from "src/modules/destination/entity/destination.entity";
import { OrderDestination } from "src/modules/order/entity/order-destination.entity";
import { User } from "src/modules/users/entity/user.entity";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Feedback extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable: true,
    default: null,
  })
  rating: string;

  @Column({
    nullable: true,
    default: null,
  })
  message: string;

  @ManyToOne(() => Destination, (destination) => destination.review)
  destination: Destination;

  @ManyToOne(
    () => OrderDestination,
    (orderDestination) => orderDestination.feedback
  )
  orderDestination: OrderDestination;

  @ManyToOne(() => User, (user) => user.feedback)
  user: User;
}
