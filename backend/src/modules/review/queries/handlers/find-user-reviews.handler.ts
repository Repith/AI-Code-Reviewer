import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Logger } from '@nestjs/common';
import { FindUserReviewsQuery } from '../impl/find-user-reviews.query';
import { Review } from '../../entities/review.entity';

@QueryHandler(FindUserReviewsQuery)
export class FindUserReviewsHandler implements IQueryHandler<FindUserReviewsQuery> {
  private readonly logger = new Logger(FindUserReviewsHandler.name);

  constructor(@InjectModel(Review.name) private reviewModel: Model<Review>) {}

  async execute(query: FindUserReviewsQuery): Promise<Review[]> {
    const { userId } = query;

    try {
      const objectId = new Types.ObjectId(userId);

      const reviews = await this.reviewModel
        .find({ userId: objectId })
        .sort({ createdAt: -1 })
        .exec();

      this.logger.log(`Found ${reviews.length} reviews for user ${userId}`);
      return reviews;
    } catch (error) {
      this.logger.error(`Error finding user reviews: ${error.message}`, error.stack);
      return [];
    }
  }
}
