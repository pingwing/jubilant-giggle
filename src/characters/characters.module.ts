import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersResolver } from './characters.resolver';

@Module({
  providers: [CharactersResolver, CharactersService],
})
export class CharactersModule {}
