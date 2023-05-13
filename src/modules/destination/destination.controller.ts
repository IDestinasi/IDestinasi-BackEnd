import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { DestinationService } from "./destination.service";
import { FilterDestinationType } from "./types/filter-destination.type";
import { Destination } from "./entity/destination.entity";
import { CreateDestinationType } from "./types/create-destination.type";
import { UUIDValidationPipe } from "src/pipes/uuid-validation.pipe";
import { GetUser } from "../auth/get-user.decorator";
import { User } from "../users/entity/user.entity";
import { JwtGuard } from "src/guards/jwt.guard";

@Controller("destination")
@UseGuards(JwtGuard)
export class DestinationController {
  constructor(private destionationService: DestinationService) {}

  @Get()
  async getDestinations(
    @Query() filter: FilterDestinationType,
    @GetUser() user: User
  ): Promise<Destination[]> {
    return this.destionationService.getDestinations(filter);
  }

  @Get("/:id")
  async getDestinationById(@Param("id") id: string): Promise<Destination> {
    return await this.destionationService.getDestinationById(id);
  }

  @Get("new")
  async getNewDestinations(): Promise<Destination[]> {
    return this.destionationService.getNewDestinations();
  }

  @Post()
  async createDestination(
    @Body() createDestinationType: CreateDestinationType,
    @Req() req
  ): Promise<void> {
    return this.destionationService.createDestination(createDestinationType);
  }

  // @Get("/:id")
  // async getDestinationById(
  //   @Param("id", UUIDValidationPipe) id: string
  // ): Promise<Destination> {
  //   return await this.destionationService.getDestinationById(id);
  // }
}
