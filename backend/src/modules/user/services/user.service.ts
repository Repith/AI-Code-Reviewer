import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateUserCommand } from '../commands/impl/create-user.command';
import { FindUserByEmailQuery } from '../queries/impl/find-user-by-email.query';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.commandBus.execute(new CreateUserCommand(createUserDto));
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.queryBus.execute(new FindUserByEmailQuery(email));
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }
}
