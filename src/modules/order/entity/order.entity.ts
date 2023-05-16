import { Destination } from "src/modules/destination/entity/destination.entity";
import { User } from "src/modules/users/entity/user.entity";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  qty: number;

  @ManyToOne(() => Destination, (destination) => destination.order)
  destination: Destination;

  @ManyToOne(() => User, (user) => user.order)
  user: User;
}
