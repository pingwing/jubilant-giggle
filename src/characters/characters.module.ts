import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersResolver } from './characters.resolver';
import { CharacterEpisodesResolver } from './character-episodes.resolver';
import { EpisodesModule } from '../episodes/episodes.module';

@Module({
  imports: [EpisodesModule],
  providers: [CharactersResolver, CharactersService, CharacterEpisodesResolver],
})
export class CharactersModule {}
