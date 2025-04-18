import { Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetsResolver } from './planets.resolver';

@Module({
  providers: [PlanetsResolver, PlanetsService],
  exports: [PlanetsService],
})
export class PlanetsModule {}
