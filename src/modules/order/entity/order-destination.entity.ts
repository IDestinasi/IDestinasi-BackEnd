import { Additional } from "src/modules/additional/entity/additional.entity";
import { Destination } from "src/modules/destination/entity/destination.entity";
import { User } from "src/modules/users/entity/user.entity";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrderAdditonal } from "./order-additional.entity";
import { Feedback } from "src/modules/feedback/entity/feedback.entity";

@Entity()
export class OrderDestination extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  qty: number;

  @ManyToOne(() => Destination, (destination) => destination.orderDestination, {
    eager: true,
  })
  destination: Destination;

  @ManyToOne(() => User, (user) => user.orderDestination)
  user: User;

  @Column()
  visitingDate: Date;

  @Column()
  payment: string;

  @Column()
  total: number;

  @Column()
  token: string;

  @Column()
  va_number: string;

  @Column()
  status: string;

  @OneToMany(() => Feedback, (feedback) => feedback.orderDestination)
  feedback: Feedback;
}
