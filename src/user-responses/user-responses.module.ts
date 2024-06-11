import { Module } from '@nestjs/common';
import { UserResponsesController } from './user-responses.controller';
import { UserResponsesService } from './user-responses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResponse } from './user-responses.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserResponse])],
  controllers: [UserResponsesController],
  providers: [UserResponsesService]
})
export class UserResponsesModule { }
