import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserType } from "./types/create-user.type";
import { SuccessResponse } from "src/interface/success-response.interface";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUser(@Body() payload: CreateUserType): Promise<SuccessResponse> {
    const status = await this.userService.createUser(payload);

    if (status == "success") {
      return {
        status: 201,
        message: "user created successfully",
        data: {},
      };
    } else if (status == "duplicate") {
      return {
        status: 409,
        message: "email already exists",
        data: {},
      };
    } else {
      return {
        status: 500,
        message: "something went wrong",
        data: {},
      };
    }
  }
}
