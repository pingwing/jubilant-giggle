import { Injectable } from '@nestjs/common';
import { Character } from '../graphql';
import { v7 as uuidv7 } from 'uuid';

@Injectable()
export class CharactersService {
  private readonly characters: Array<Character> = [
    { id: 'test123', name: 'Cat' },
  ];

  create(character: Character): Character {
    character.id = uuidv7();
    this.characters.push(character);
    return character;
  }

  findAll(): Character[] {
    return this.characters;
  }

  // findOneById(id: string): Character {
  //   const character = this.characters.find((char) => char.id === id);
  //   if (!character) {
  //     throw new Error(`Character with id ${id} not found`);
  //   }
  //   return character;
  // }
}
