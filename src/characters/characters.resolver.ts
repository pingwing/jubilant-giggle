import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CharactersService } from './characters.service';
// import { CreateCharacterInput } from './dto/create-character.input';
// import { UpdateCharacterInput } from './dto/update-character.input';

@Resolver('Character')
export class CharactersResolver {
  constructor(private readonly charactersService: CharactersService) {}

  // @Mutation('createCharacter')
  // create(@Args('createCharacterInput') createCharacterInput: CreateCharacterInput) {
  //   return this.charactersService.create(createCharacterInput);
  // }

  @Query('characters')
  findAll() {
    return this.charactersService.findAll();
  }

  @Query('character')
  findOne(@Args('id') id: number) {
    return this.charactersService.findOne(id);
  }

  // @Mutation('updateCharacter')
  // update(@Args('updateCharacterInput') updateCharacterInput: UpdateCharacterInput) {
  //   return this.charactersService.update(updateCharacterInput.id, updateCharacterInput);
  // }
  //
  // @Mutation('removeCharacter')
  // remove(@Args('id') id: number) {
  //   return this.charactersService.remove(id);
  // }
}
