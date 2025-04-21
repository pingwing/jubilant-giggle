import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersResolver } from './characters.resolver';
import { CharacterEpisodesResolver } from './character-episodes.resolver';
import { EpisodesModule } from '../episodes/episodes.module';
import { PlanetsModule } from '../planets/planets.module';
import { CharacterPlanetResolver } from './character-planet.resolver';

@Module({
  imports: [EpisodesModule, PlanetsModule],
  providers: [
    CharactersResolver,
    CharactersService,
    CharacterEpisodesResolver,
    CharacterPlanetResolver,
  ],
})
export class CharactersModule {}
