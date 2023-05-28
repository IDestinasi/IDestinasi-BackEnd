import { Controller, Get, Param, UseGuards, Post } from "@nestjs/common";
import { AdditionalService } from "./additional.service";
import { UUIDValidationPipe } from "src/pipes/uuid-validation.pipe";
import { Additional } from "./entity/additional.entity";
import { JwtGuard } from "src/guards/jwt.guard";

@Controller("additional")
@UseGuards(JwtGuard)
export class AdditionalController {
  constructor(private readonly additionalService: AdditionalService) {}

  @Get("/:id")
  async getAdditional(@Param("id") id: string): Promise<Additional[]> {
    return this.additionalService.getAdditionalsByDestinationId(id);
  }

  // @Post()
  // async createAdditional(): Promise<Additional> {
  //   return this.additionalService.createAdditional();
  // }
}
