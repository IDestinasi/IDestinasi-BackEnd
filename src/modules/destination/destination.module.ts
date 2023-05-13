import { Module } from "@nestjs/common";
import { DestinationController } from "./destination.controller";
import { DestinationService } from "./destination.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DestinationRepository } from "./repository/destination.repository";

@Module({
  imports: [TypeOrmModule.forFeature([DestinationRepository])],
  controllers: [DestinationController],
  providers: [DestinationService],
})
export class DestinationModule {}
