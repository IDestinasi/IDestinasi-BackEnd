import { Module } from "@nestjs/common";
import { AdditionalController } from "./additional.controller";
import { AdditionalService } from "./additional.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdditionalRepository } from "./repository/additional.repository";

@Module({
  imports: [TypeOrmModule.forFeature([AdditionalRepository])],
  controllers: [AdditionalController],
  providers: [AdditionalService],
})
export class AdditionalModule {}
