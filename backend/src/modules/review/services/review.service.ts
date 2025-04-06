import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateReviewDto } from '../dto/create-review.dto';
import { CreateReviewCommand } from '../commands/impl/create-review.command';
import { FindUserReviewsQuery } from '../queries/impl/find-user-reviews.query';
import { Review } from '../entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async create(createReviewDto: CreateReviewDto, userId?: string): Promise<Review> {
    return this.commandBus.execute(new CreateReviewCommand(createReviewDto, userId));
  }

  async findUserReviews(userId: string): Promise<Review[]> {
    return this.queryBus.execute(new FindUserReviewsQuery(userId));
  }
}
