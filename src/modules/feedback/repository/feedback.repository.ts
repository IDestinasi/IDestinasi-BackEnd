import { EntityRepository, Repository } from "typeorm";
import { Feedback } from "../entity/feedback.entity";
import { createFeedbackType } from "../types/create-feedback.types";
import { OrderDestination } from "src/modules/order/entity/order-destination.entity";
import { OrderDestinationRepository } from "src/modules/order/repository/order-destination.repository";
import { DestinationRepository } from "src/modules/destination/repository/destination.repository";
import { User } from "src/modules/users/entity/user.entity";
import { Response } from "express";

@EntityRepository(Feedback)
export class FeedbackRepository extends Repository<Feedback> {
  async createFeedback(
    id: string,
    reviewCreate: createFeedbackType,
    destinationRepository: DestinationRepository,
    orderDestinationRepository: OrderDestinationRepository,
    user: User
  ): Promise<void> {
    const { rating, message } = reviewCreate;

    const orderDestination = await orderDestinationRepository.findOne(id);
    
    const destination = await destinationRepository.findOne(
      orderDestination.destination.id
    );
    const feedback = this.create();
    feedback.rating = rating;
    feedback.message = message;
    feedback.destination = destination;
    feedback.orderDestination = orderDestination;
    feedback.user = user;
    await feedback.save();

    // return responsee http  success create
  }
}
