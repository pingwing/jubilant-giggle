import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CharactersService } from './characters.service';
import { CreateCharacterInput } from './dto/create-character.input';
import { UpdateCharacterInput } from './dto/update-character.input';
import { GetCharactersInput } from './dto/get-characters.input';

@Resolver('Character')
export class CharactersResolver {
  constructor(private readonly charactersService: CharactersService) {}

  @Mutation('createCharacter')
  create(
    @Args('createCharacterInput') createCharacterInput: CreateCharacterInput,
  ) {
    return this.charactersService.create(createCharacterInput);
  }

  @Query('characters')
  findAll(
    @Args('getCharactersInput')
    getCharactersInput: GetCharactersInput = { first: 25, after: 0 },
  ) {
    return this.charactersService.findAll(getCharactersInput);
  }

  @Query('character')
  findOneById(@Args('id') id: string) {
    return this.charactersService.findOneById(id);
  }

  @Mutation('updateCharacter')
  update(
    @Args('updateCharacterInput') updateCharacterInput: UpdateCharacterInput,
  ) {
    return this.charactersService.update(
      updateCharacterInput.id,
      updateCharacterInput,
    );
  }

  @Mutation('removeCharacter')
  remove(@Args('id') id: string) {
    return this.charactersService.remove(id);
  }
}
