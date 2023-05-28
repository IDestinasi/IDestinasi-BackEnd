import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import * as bcrypt from "bcrypt";
import { RefreshToken } from "src/modules/auth/entity/refresh-token.entity";
import { Destination } from "src/modules/destination/entity/destination.entity";
import { OrderDestination } from "src/modules/order/entity/order-destination.entity";
import { OrderAdditonal } from "src/modules/order/entity/order-additional.entity";
import { Feedback } from "src/modules/feedback/entity/feedback.entity";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  role: string;

  @Column()
  birth: Date;

  @Column()
  gender: number;

  @Column()
  phone: string;

  @Column()
  address: string;

  // @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user, {
  //   eager: true,
  // })
  // refreshToken: RefreshToken[];

  @OneToMany(() => Destination, (destination) => destination.user)
  destination: Destination[];

  @OneToMany(
    () => OrderDestination,
    (orderDestination) => orderDestination.user
  )
  orderDestination: OrderDestination[];

  @OneToMany(() => OrderAdditonal, (orderAdditonal) => orderAdditonal.user)
  orderAdditonal: OrderAdditonal;

  @OneToMany(() => Feedback, (feedback) => feedback.user)
  feedback: Feedback;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);

    return hash === this.password;
  }
}
