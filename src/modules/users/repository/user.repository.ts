import { EntityRepository, Repository } from "typeorm";
import { User } from "../entity/user.entity";
import { CreateUserType } from "../types/create-user.type";
import * as bcrypt from "bcrypt";
import {
  ConflictException,
  InternalServerErrorException,
} from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserType: CreateUserType): Promise<any> {
    const { name, email, password, role, birth, gender, phone, address } =
      createUserType;

    const user = this.create();
    user.name = name;
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, user.salt);
    user.role = role;
    user.birth = birth;
    user.gender = gender;
    user.phone = phone;
    user.address = address;

    try {
      await user.save();
      return true;
    } catch (e) {
      return e;
    }
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.findOne({ email });

    if (user && (await user.validatePassword(password))) {
      return user;
    }

    return null;
  }
}
