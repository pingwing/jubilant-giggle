import { v7 as uuidv7 } from 'uuid';
import { Injectable } from '@nestjs/common';

import { Character } from '../graphql';
import { CreateCharacterInput } from './dto/create-character.input';
import { UpdateCharacterInput } from './dto/update-character.input';

@Injectable()
export class CharactersService {
  private readonly characters: Array<
    Character & { episodesIds?: string[]; planetId?: string }
  > = [
    {
      id: '019645d4-8273-7758-92d7-f20f20d723be',
      name: 'Luke Skajłoker',
      episodesIds: [
        '019645e2-eb79-77fb-aa90-45713d40d289',
        '019645e2-eb79-77fb-aa90-4a35b46ae7e2',
        '019645e2-eb79-77fb-aa90-4c47432a6c01',
      ],
      episodes: [],
      planetId: '01964604-7f3b-72b4-884c-e8fc73e86c59',
    },
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
    return this.characters.find((character) => character.id === id);
  }

  update(id: string, updateCharacterInput: UpdateCharacterInput) {
    const characterToUpdate = this.characters.find(
      (character) => character.id === id,
    );

    if (!characterToUpdate) {
      throw new Error(`Character with id #${id} not found`);
    }

    characterToUpdate.name = updateCharacterInput.name;
    return characterToUpdate;
  }

  remove(id: string) {
    const characterIndex = this.characters.findIndex(
      (character) => character.id === id,
    );

    if (characterIndex === -1) {
      throw new Error(`Character with id #${id} not found`);
    }

    return this.characters.splice(characterIndex, 1)[0];
  }
}
