import { IsNotEmpty } from "class-validator";

export class LoginType {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
