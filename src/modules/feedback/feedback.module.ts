import { Module } from "@nestjs/common";
import { FeedbackService } from "./feedback.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FeedbackController } from "./feedback.controller";
import { FeedbackRepository } from "./repository/feedback.repository";
import { DestinationRepository } from "../destination/repository/destination.repository";
import { OrderDestination } from "../order/entity/order-destination.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([FeedbackRepository]),
    TypeOrmModule.forFeature([DestinationRepository]),
    TypeOrmModule.forFeature([OrderDestination]),
  ],
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class FeedbackModule {}
