import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('api/task')
@UseGuards(JwtAuthGuard)
export class TaskController {
  @Get('/')
  async tasks() {
    return 1;
  }
}
