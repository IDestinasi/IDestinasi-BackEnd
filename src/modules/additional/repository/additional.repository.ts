import { EntityRepository, Repository } from "typeorm";
import { Additional } from "../entity/additional.entity";

@EntityRepository(Additional)
export class AdditionalRepository extends Repository<Additional> {
  async getAdditionalsByDestinationId(id: string): Promise<Additional[]> {
    const query = this.createQueryBuilder("additional");

    query.andWhere("additional.destinationId = :id", { id });

    return await query.getMany();
  }
}
