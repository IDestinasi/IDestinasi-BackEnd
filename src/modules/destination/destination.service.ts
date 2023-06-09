import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DestinationRepository } from "./repository/destination.repository";
import { FilterDestinationType } from "./types/filter-destination.type";
import { Destination } from "./entity/destination.entity";
import { CreateDestinationType } from "./types/create-destination.type";
import { Additional } from "../additional/entity/additional.entity";
import { log } from "console";
import { User } from "../users/entity/user.entity";
import path from "path";

@Injectable()
export class DestinationService {
  constructor(
    @InjectRepository(DestinationRepository)
    private readonly destinationRepository: DestinationRepository
  ) {}

  async getDestinations(filter: FilterDestinationType): Promise<Destination[]> {
    return await this.destinationRepository.getDestinations(filter);
  }

  async getMyDestinationByUserId(user: User): Promise<Destination[]> {
    return await this.destinationRepository.getMyDestinationByUserId(user);
  }

  async getNewDestinations(): Promise<Destination[]> {
    return await this.destinationRepository.getNewDestinations();
  }

  async createDestination(
    user,
    createDestinationType: CreateDestinationType
  ): Promise<Destination> {
    return await this.destinationRepository.createDestination(
      user,
      createDestinationType
    );
  }

  async getDestinationById(id: string): Promise<Destination> {
    // get destination with additional
    const destination = await this.destinationRepository.findOne(id, {
      relations: ["additional"],
    });
    if (!destination) {
      throw new NotFoundException(`Destination with id ${id} not found`);
    }

    const result: { available: Additional[]; empty: Additional[] } = {
      available: [],
      empty: [],
    };

    destination.additional.forEach((additional) => {
      if (additional.qty > 0) {
        result.available.push(additional);
      } else {
        result.empty.push(additional);
      }
    });

    destination.available = result.available;
    destination.empty = result.empty;
    delete destination.additional;

    return destination;
  }
}
