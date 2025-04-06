import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { User, UserSchema } from './entities/user.entity';

import { CreateUserHandler } from './commands/handlers/create-user.handler';

import { FindUserByEmailHandler } from './queries/handlers/find-user-by-email.handler';

const CommandHandlers = [CreateUserHandler];
const QueryHandlers = [FindUserByEmailHandler];

@Module({
  imports: [CqrsModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService, ...CommandHandlers, ...QueryHandlers],
  exports: [UserService],
})
export class UserModule {}
