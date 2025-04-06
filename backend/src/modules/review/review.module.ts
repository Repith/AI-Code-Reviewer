import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { ReviewController } from './controllers/review.controller';
import { ReviewService } from './services/review.service';
import { AiReviewService } from './services/ai-review.service';
import { Review, ReviewSchema } from './entities/review.entity';

import { CreateReviewHandler } from './commands/handlers/create-review.handler';

import { FindUserReviewsHandler } from './queries/handlers/find-user-reviews.handler';

const CommandHandlers = [CreateReviewHandler];
const QueryHandlers = [FindUserReviewsHandler];

@Module({
  imports: [CqrsModule, MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }])],
  controllers: [ReviewController],
  providers: [ReviewService, AiReviewService, ...CommandHandlers, ...QueryHandlers],
})
export class ReviewModule {}
