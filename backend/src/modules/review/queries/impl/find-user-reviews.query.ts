import { IQuery } from '@nestjs/cqrs';

export class FindUserReviewsQuery implements IQuery {
  constructor(public readonly userId: string) {}
}
