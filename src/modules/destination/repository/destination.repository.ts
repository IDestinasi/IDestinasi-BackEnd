import { EntityRepository, Repository } from "typeorm";
import { Destination } from "../entity/destination.entity";
import { FilterDestinationType } from "../types/filter-destination.type";
import { InternalServerErrorException } from "@nestjs/common";
import { CreateDestinationType } from "../types/create-destination.type";
import { User } from "src/modules/users/entity/user.entity";

@EntityRepository(Destination)
export class DestinationRepository extends Repository<Destination> {
  async getDestinations(filter: FilterDestinationType): Promise<Destination[]> {
    const { name, category } = filter;

    const query = this.createQueryBuilder("destination");

    if (name) {
      query.andWhere("lower(destination.name) LIKE :name", {
        name: `%${name.toLowerCase()}%`,
      });
    }

    if (category) {
      query.andWhere("lower(destination.category) LIKE :category", {
        category: `%${category.toLowerCase()}`,
      });
    }

    return await query.getMany();
  }

  async getMyDestinationByUserId(user: User): Promise<Destination[]> {
    // convert user.id to string
    const query = this.createQueryBuilder("destination").where(
      "destination.userId = :userId",
      { userId: user.id }
    );
    // beritahu jika query tidak ada data
    const data = await query.getMany();
    if (!data) {
      throw new InternalServerErrorException("You have no destination");
    }
    return data;
  }

  async getNewDestinations(): Promise<Destination[]> {
    const query = this.createQueryBuilder("destination");
    query.orderBy("destination.createdAt", "DESC");
    query.limit(5);
    return await query.getMany();
  }

  async createDestination(
    user: User,
    createDestinationType: CreateDestinationType
  ): Promise<void> {
    const { name, category, price } = createDestinationType;

    const destination = this.create();
    console.log(createDestinationType.uuid);
    destination.id = createDestinationType.uuid;
    destination.name = name;
    destination.category = category;
    destination.user = user;
    destination.createdAt = new Date();
    destination.price = price;

    try {
      await destination.save();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  // async findDestinastionById(id: string): Promise<Destination> {
  //   return await this.findOne(id);
  // }
}
