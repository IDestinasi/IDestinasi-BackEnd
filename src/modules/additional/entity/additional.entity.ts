import { Destination } from "src/modules/destination/entity/destination.entity";
import { User } from "src/modules/users/entity/user.entity";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Additional extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  qty: number;

  @Column()
  price: number;

  @ManyToOne(() => Destination, (destination) => destination.additional)
  destination: Destination;

  @ManyToMany(() => User)
  @JoinTable()
  rent: User[];

  empty: any;
  available: any;
}
