import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateOrderType {
  @IsNotEmpty()
  idDestinasi: string;

  @IsNotEmpty()
  qty: number;

  @IsNotEmpty()
  visitingDate: Date;

  @IsOptional()
  additional: any[];
}
