/* eslint-disable prettier/prettier */
import { Additional } from 'src/modules/additional/entity/additional.entity';
import {
  BaseEntity,
  Column,
  Entity,
  IsNull,
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

  available: Additional[];
  empty: Additional[];
}
