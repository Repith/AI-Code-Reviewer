import { ICommand } from '@nestjs/cqrs';
import { CreateReviewDto } from '../../dto/create-review.dto';

export class CreateReviewCommand implements ICommand {
  constructor(
    public readonly createReviewDto: CreateReviewDto,
    public readonly userId?: string,
    public readonly feedback?: string
  ) {}
}
