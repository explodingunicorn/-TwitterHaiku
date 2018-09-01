import { Get, Controller, Param } from '@nestjs/common';
import { HaikusService } from '../services/haikus.service';

@Controller('haikus')
export class HaikusController {
  constructor(private readonly haikusService: HaikusService) {}

  @Get()
  async root(): Promise<any> {
    return await this.haikusService.findRecentHaikus();
  }

  @Get('user/:id')
  async getUserHaikus(@Param('id') id) {
    return this.haikusService.findUserHaikus(id);
  }
}
