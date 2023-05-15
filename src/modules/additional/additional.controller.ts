import { Controller, Get, Param } from "@nestjs/common";
import { AdditionalService } from "./additional.service";
import { UUIDValidationPipe } from "src/pipes/uuid-validation.pipe";
import { Additional } from "./entity/additional.entity";

@Controller("additional")
export class AdditionalController {
  constructor(private readonly additionalService: AdditionalService) {}

  @Get("/:id")
  async getAdditional(@Param("id") id: string): Promise<Additional[]> {
    return this.additionalService.getAdditionalsByDestinationId(id);
  }
}
