import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { TaskModule } from './task/task.module';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [AuthModule, TypeOrmModule, TypeOrmModule.forRoot(typeormConfig()), TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
