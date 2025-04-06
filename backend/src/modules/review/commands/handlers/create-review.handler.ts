import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Logger } from '@nestjs/common';
import { CreateReviewCommand } from '../impl/create-review.command';
import { Review } from '../../entities/review.entity';
import { AiReviewService } from '../../services/ai-review.service';

@CommandHandler(CreateReviewCommand)
export class CreateReviewHandler implements ICommandHandler<CreateReviewCommand> {
  private readonly logger = new Logger(CreateReviewHandler.name);

  constructor(
    @InjectModel(Review.name)
    private reviewModel: Model<Review>,
    private aiReviewService: AiReviewService
  ) {}

  async execute(command: CreateReviewCommand): Promise<Review> {
    const { createReviewDto, userId, feedback } = command;

    let reviewFeedback = feedback;

    if (!reviewFeedback) {
      reviewFeedback = '';
      await this.aiReviewService.getStreamingFeedback(
        createReviewDto.code,
        createReviewDto.language,
        chunk => {
          reviewFeedback += chunk;
        }
      );
    }

    const reviewData: any = {
      ...createReviewDto,
      feedback: reviewFeedback,
    };

    if (userId) {
      try {
        reviewData.userId = new Types.ObjectId(userId);
      } catch (error) {
        this.logger.error(`Invalid userId format: ${userId}`, error.stack);
      }
    }

    const review = new this.reviewModel(reviewData);
    return review.save();
  }
}
