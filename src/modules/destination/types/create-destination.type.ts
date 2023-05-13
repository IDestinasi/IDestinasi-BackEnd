/* eslint-disable prettier/prettier */
import { Column, PrimaryGeneratedColumn } from "typeorm";

export class CreateDestinationType {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  category: string;
}
