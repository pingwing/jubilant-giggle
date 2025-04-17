import { v7 as uuidv7 } from 'uuid';
import { Injectable } from '@nestjs/common';

import { Character } from '../graphql';
import { CreateCharacterInput } from './dto/create-character.input';
// import { UpdateCharacterInput } from './dto/update-character.input';

@Injectable()
export class CharactersService {
  private readonly characters: Array<Character> = [
    { id: '019645d4-8273-7758-92d7-f20f20d723be', name: 'Luke Skajłoker' },
  ];

  create(createCharacterInput: CreateCharacterInput) {
    const character = new Character();
    character.id = uuidv7();
    character.name = createCharacterInput.name;
    this.characters.push(character);
    return character;
  }

  findAll() {
    return this.characters;
  }

  findOne(id: string) {
    return `This action returns a #${id} character`;
  }

  // update(id: number, updateCharacterInput: UpdateCharacterInput) {
  //   return `This action updates a #${id} character`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} character`;
  // }
}
