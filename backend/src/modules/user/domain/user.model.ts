import { AggregateRoot } from '@nestjs/cqrs';

export class UserModel extends AggregateRoot {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly password?: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {
    super();
  }

  static fromEntity(entity: any): UserModel {
    return new UserModel(
      entity._id.toString(),
      entity.email,
      entity.password,
      entity.createdAt,
      entity.updatedAt
    );
  }
}
