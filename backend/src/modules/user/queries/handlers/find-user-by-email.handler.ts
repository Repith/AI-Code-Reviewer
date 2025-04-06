import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FindUserByEmailQuery } from '../impl/find-user-by-email.query';
import { User } from '../../entities/user.entity';

@QueryHandler(FindUserByEmailQuery)
export class FindUserByEmailHandler implements IQueryHandler<FindUserByEmailQuery> {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async execute(query: FindUserByEmailQuery): Promise<User | null> {
    const { email } = query;
    return this.userModel.findOne({ email }).exec();
  }
}
