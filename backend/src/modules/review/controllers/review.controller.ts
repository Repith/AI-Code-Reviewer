import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Res,
  Get,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateReviewDto } from '../dto/create-review.dto';
import { CreateReviewCommand } from '../commands/impl/create-review.command';
import { FindUserReviewsQuery } from '../queries/impl/find-user-reviews.query';
import { Response } from 'express';
import { AiReviewService } from '../services/ai-review.service';

@Controller('review')
export class ReviewController {
  private readonly logger = new Logger(ReviewController.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly aiReviewService: AiReviewService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createReviewDto: CreateReviewDto, @Request() req) {
    const userId = req.user._id || req.user.id || req.user.sub;

    if (!userId) {
      throw new UnauthorizedException('User must be authenticated to create reviews!');
    }

    this.logger.log(`Creating review for user: ${userId}`);

    const review = await this.commandBus.execute(new CreateReviewCommand(createReviewDto, userId));

    return {
      reviewId: review._id,
      feedback: review.feedback,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('user-reviews')
  async getUserReviews(@Request() req) {
    const userId = req.user._id || req.user.id || req.user.sub;

    if (!userId) {
      throw new UnauthorizedException('User must be authenticated to view reviews!');
    }

    this.logger.log(`Finding reviews for user: ${userId}`);

    return this.queryBus.execute(new FindUserReviewsQuery(userId));
  }

  @UseGuards(JwtAuthGuard)
  @Post('stream')
  async streamReview(
    @Body() createReviewDto: CreateReviewDto,
    @Res() response: Response,
    @Request() req
  ) {
    response.setHeader('Content-Type', 'text/plain');
    response.setHeader('Cache-Control', 'no-cache');
    response.setHeader('Connection', 'keep-alive');

    try {
      const userId = req.user._id || req.user.id || req.user.sub;

      if (!userId) {
        response.status(401).end('User must be authenticated to create reviews!');
        return;
      }

      this.logger.log(`Creating streaming review for user: ${userId}`);

      let fullFeedback = '';

      const aiService = this.aiReviewService.getStreamingFeedback(
        createReviewDto.code,
        createReviewDto.language,
        chunk => {
          fullFeedback += chunk;
          response.write(chunk);
        }
      );

      await aiService;

      await this.commandBus.execute(
        new CreateReviewCommand(
          {
            code: createReviewDto.code,
            language: createReviewDto.language,
          },
          userId,
          fullFeedback
        )
      );

      response.end();
    } catch (error) {
      this.logger.error(`Error streaming review: ${error.message}`, error.stack);
      response.status(500).end('Error processing your request');
    }
  }
}
