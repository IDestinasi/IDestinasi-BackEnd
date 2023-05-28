/* eslint-disable prettier/prettier */

import { IsNotEmpty } from "class-validator";

export class CreateDestinationType {

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  description: string;

}
