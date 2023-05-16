/* eslint-disable prettier/prettier */
import { Additional } from 'src/modules/additional/entity/additional.entity';
import { Order } from 'src/modules/order/entity/order.entity';
import { User } from 'src/modules/users/entity/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  IsNull,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Destination extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column({
    nullable: true
  })
  createdAt: Date;

  @OneToMany(() => Additional, (additional) => additional.destination, {
    eager: true,
  })
  additional: Additional[];

  @ManyToOne(() => User, (user) => user.destination)
  user: User;

  @OneToMany(() => Order, (order) => order.destination)
  order: Order[];

  available: Additional[];
  empty: Additional[];
}
