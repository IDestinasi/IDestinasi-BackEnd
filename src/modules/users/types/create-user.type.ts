import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserType {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  role: string;

  @IsNotEmpty()
  birth: Date;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  gender: number;
}
