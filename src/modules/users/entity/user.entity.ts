import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import * as bcrypt from "bcrypt";
import { RefreshToken } from "src/modules/auth/entity/refresh-token.entity";
import { Destination } from "src/modules/destination/entity/destination.entity";
import { Order } from "src/modules/order/entity/order.entity";

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

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user, {
    eager: true,
  })
  refreshToken: RefreshToken[];

  @OneToMany(() => Destination, (destination) => destination.user)
  destination: Destination[];

  @OneToMany(() => Order, (order) => order.user)
  order: Order[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);

    return hash === this.password;
  }
}
