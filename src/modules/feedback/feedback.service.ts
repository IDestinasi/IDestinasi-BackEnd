import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FeedbackRepository } from "./repository/feedback.repository";
import { createFeedbackType } from "./types/create-feedback.types";
import { OrderDestinationRepository } from "../order/repository/order-destination.repository";
import { Destination } from "../destination/entity/destination.entity";
import { DestinationRepository } from "../destination/repository/destination.repository";
import { Feedback } from "./entity/feedback.entity";
import { User } from "../users/entity/user.entity";

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(FeedbackRepository)
    private readonly feedbackRepository: FeedbackRepository,

    @InjectRepository(DestinationRepository)
    private readonly destinationRepository: DestinationRepository,

    @InjectRepository(OrderDestinationRepository)
    private readonly orderDestinationRepository: OrderDestinationRepository
  ) {}

  async ratingDestination(
    id: string,
    review: createFeedbackType,
    user: User
  ): Promise<void> {
    return this.feedbackRepository.createFeedback(
      id,
      review,
      this.destinationRepository,
      this.orderDestinationRepository,
      user
    );
  }
}
