// import { v7 as uuidv7 } from 'uuid';

import { Injectable } from '@nestjs/common';
import { Character } from '../graphql';
// import { CreateCharacterInput } from './dto/create-character.input';
// import { UpdateCharacterInput } from './dto/update-character.input';

@Injectable()
export class CharactersService {
  private readonly characters: Array<Character> = [
    { id: 'test123', name: 'Cat' },
  ];

  // create(createCharacterInput: CreateCharacterInput) {
  //   character.id = uuidv7();
  //     this.characters.push(character);
  //     return character;
  // }

  findAll() {
    return this.characters;
  }

  findOne(id: number) {
    return `This action returns a #${id} character`;
  }

  // update(id: number, updateCharacterInput: UpdateCharacterInput) {
  //   return `This action updates a #${id} character`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} character`;
  // }
}
