import { Module } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { EpisodesResolver } from './episodes.resolver';

@Module({
  providers: [EpisodesResolver, EpisodesService],
})
export class EpisodesModule {}
