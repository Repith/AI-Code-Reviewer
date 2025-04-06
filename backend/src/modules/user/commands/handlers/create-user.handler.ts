import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ConflictException } from '@nestjs/common';
import { CreateUserCommand } from '../impl/create-user.command';
import { User } from '../../entities/user.entity';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async execute(command: CreateUserCommand): Promise<User> {
    const { createUserDto } = command;
    const { email, password } = createUserDto;

    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const { password: _, ...result } = newUser.toObject();
    return result as unknown as User;
  }
}
