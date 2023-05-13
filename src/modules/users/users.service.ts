import { Injectable } from "@nestjs/common";
import { UserRepository } from "./repository/user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserType } from "./types/create-user.type";
import { User } from "./entity/user.entity";
import { SuccessResponse } from "src/interface/success-response.interface";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  async createUser(createUserType: CreateUserType): Promise<any> {
    let status = await this.userRepository.createUser(createUserType);
    if (status == true) {
      return (status = "success");
    } else {
      if (status.errno == 1062) {
        return (status = "duplicate");
      } else {
        return (status = "failed");
      }
    }
  }

  async validateUser(email: string, password: string): Promise<User> {
    return await this.userRepository.validateUser(email, password);
  }

  async findUserById(id: string): Promise<User> {
    return await this.userRepository.findOne(id);
  }
}
