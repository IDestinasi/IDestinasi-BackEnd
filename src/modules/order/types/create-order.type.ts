import { IsNotEmpty, IsOptional } from "class-validator";
import { Additional } from "src/modules/additional/entity/additional.entity";
import { Destination } from "src/modules/destination/entity/destination.entity";

export class CreateOrderType {
  @IsNotEmpty()
  idDestinasi: string;

  @IsNotEmpty()
  qty: number;

  @IsNotEmpty()
  visitingDate: Date;

  @IsNotEmpty()
  payment: string;

  @IsOptional()
  total: number;

  @IsOptional()
  token: string;
}
