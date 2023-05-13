/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";

export class UpdateDestinationType {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  category: string;
}
