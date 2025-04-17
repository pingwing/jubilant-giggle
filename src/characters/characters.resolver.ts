import { Query, Resolver } from '@nestjs/graphql';
import { CharactersService } from './characters.service';

@Resolver('Character')
export class AuthorsResolver {
  constructor(private charactersService: CharactersService) {}

  @Query()
  characters() {
    return this.charactersService.findAll();
  }

  // findOneById(@Args('id') id: string) {
  //   return this.charactersService.findOneById(id);
  // }
}
