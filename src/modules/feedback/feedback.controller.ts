import { Controller, Post, Param, Body, UseGuards } from "@nestjs/common";
import { FeedbackService } from "./feedback.service";
import { createFeedbackType } from "./types/create-feedback.types";
import { Feedback } from "./entity/feedback.entity";
import { GetUser } from "../auth/get-user.decorator";
import { User } from "../users/entity/user.entity";
import { JwtGuard } from "src/guards/jwt.guard";

@Controller("feedback")
@UseGuards(JwtGuard)
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post("rating/:id")
  async ratingDestination(
    @Param("id") id: string,
    @Body() review: createFeedbackType,
    @GetUser() user: User
  ): Promise<void> {
    console.log(id);
    return this.feedbackService.ratingDestination(id, review, user);
  }
}
