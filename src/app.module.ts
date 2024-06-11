import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UserResponsesModule } from './user-responses/user-responses.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'postgres',
      host: 'headcount-staging.clvg5xp7v2ur.us-east-1.rds.amazonaws.com',
      port: 3324,
      username: 'headcount',
      password: 'Deloitte123',
      database: 'test-dharmender',
      entities: [join(__dirname, '../') + '**/*.entity.js'],
      synchronize: true,
    }),
    UserResponsesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
