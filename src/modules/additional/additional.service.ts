import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdditionalRepository } from "./repository/additional.repository";
import { Additional } from "./entity/additional.entity";

@Injectable()
export class AdditionalService {
  constructor(
    @InjectRepository(AdditionalRepository)
    private readonly additionalRepository: AdditionalRepository
  ) {}

  async getAdditionalsByDestinationId(id: string): Promise<Additional[]> {
    return await this.additionalRepository.getAdditionalsByDestinationId(id);
  }
}
