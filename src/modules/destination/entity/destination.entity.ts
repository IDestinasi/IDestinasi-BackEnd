/* eslint-disable prettier/prettier */
import { Additional } from 'src/modules/additional/entity/additional.entity';
import { Feedback } from 'src/modules/feedback/entity/feedback.entity';
import { OrderDestination } from 'src/modules/order/entity/order-destination.entity';
import { User } from 'src/modules/users/entity/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Destination extends BaseEntity {
  // @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    nullable: true,
    default: null,
  })  name: string;

  @Column({
    nullable: true,
    default: null,
  })  description: string;

  @Column({
    nullable: true,
    default: null,
  })  city: string;
  
  @Column({
    nullable: true,
    default: null,
  })  price: number;

  @Column({
    nullable: true,
    default: null,
  })  category: string;

  @Column({
    nullable: true,
    default: null,
  })
  createdAt: Date;

  @OneToMany(() => Additional, (additional) => additional.destination)
  additional: Additional[];

  @ManyToOne(() => User, (user) => user.destination, {
    eager: true,
  })
  user: User;

  @OneToMany(() => OrderDestination, (orderDestination) => orderDestination.destination)
  orderDestination: OrderDestination[];

  @OneToMany(() => Feedback, (feedBack) => feedBack.destination)
  review: Feedback[];

  available: Additional[];
  empty: Additional[];
}
