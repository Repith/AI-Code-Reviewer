import { AggregateRoot } from '@nestjs/cqrs';
import { Types } from 'mongoose';

export class ReviewModel extends AggregateRoot {
  constructor(
    public readonly id: string,
    public readonly code: string,
    public readonly language: string,
    public readonly feedback: string,
    public readonly userId?: Types.ObjectId,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {
    super();
  }

  static fromEntity(entity: any): ReviewModel {
    return new ReviewModel(
      entity._id.toString(),
      entity.code,
      entity.language,
      entity.feedback,
      entity.userId,
      entity.createdAt,
      entity.updatedAt
    );
  }
}
