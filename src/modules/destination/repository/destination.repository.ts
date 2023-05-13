import { EntityRepository, Repository } from "typeorm";
import { Destination } from "../entity/destination.entity";
import { FilterDestinationType } from "../types/filter-destination.type";
import { InternalServerErrorException } from "@nestjs/common";
import { CreateDestinationType } from "../types/create-destination.type";

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

  async getNewDestinations(): Promise<Destination[]> {
    const query = this.createQueryBuilder("destination");
    query.orderBy("destination.createdAt", "DESC");
    query.limit(5);
    return await query.getMany();
  }

  async createDestination(
    createDestinationType: CreateDestinationType
  ): Promise<void> {
    const { name, category } = createDestinationType;

    const destination = this.create();
    destination.name = name;
    destination.category = category;

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
