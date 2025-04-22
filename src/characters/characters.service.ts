import { v7 as uuidv7 } from 'uuid';
import { Injectable } from '@nestjs/common';

import { Character } from '../graphql';
import { CreateCharacterInput } from './dto/create-character.input';
import { UpdateCharacterInput } from './dto/update-character.input';
import { GetCharactersInput } from './dto/get-characters.input';

@Injectable()
export class CharactersService {
  private readonly characters: Array<
    Character & { episodesIds?: string[]; planetId?: string }
  > = [
    {
      id: '019645d4-8273-7758-92d7-f20f20d723be',
      name: 'Luke Skywalker',
      episodesIds: [
        '019645e2-eb79-77fb-aa90-45713d40d289',
        '019645e2-eb79-77fb-aa90-4a35b46ae7e2',
        '019645e2-eb79-77fb-aa90-4c47432a6c01',
      ],
      episodes: [],
    },
    {
      id: '01965aac-6388-765c-b3c9-ed694de57013',
      name: 'Darth Vader',
      episodesIds: [
        '019645e2-eb79-77fb-aa90-45713d40d289',
        '019645e2-eb79-77fb-aa90-4a35b46ae7e2',
        '019645e2-eb79-77fb-aa90-4c47432a6c01',
      ],
      episodes: [],
    },
    {
      id: '01965aac-6389-7102-aaa1-8da5708abfff',
      name: 'Han Solo',
      episodesIds: [
        '019645e2-eb79-77fb-aa90-45713d40d289',
        '019645e2-eb79-77fb-aa90-4a35b46ae7e2',
        '019645e2-eb79-77fb-aa90-4c47432a6c01',
      ],
      episodes: [],
    },
    {
      id: '01965aac-6389-7102-aaa1-90d5f5ef1320',
      name: 'Leia Organa',
      episodesIds: [
        '019645e2-eb79-77fb-aa90-45713d40d289',
        '019645e2-eb79-77fb-aa90-4a35b46ae7e2',
        '019645e2-eb79-77fb-aa90-4c47432a6c01',
      ],
      episodes: [],
      planetId: '01964604-7f3b-72b4-884c-e8fc73e86c59',
    },
    {
      id: '01965aac-6389-7102-aaa1-953cf11d64af',
      name: 'Wilhuff Tarkin',
      episodesIds: ['019645e2-eb79-77fb-aa90-45713d40d289'],
      episodes: [],
    },
    {
      id: '01965aac-6389-7102-aaa1-9b9a12cc675c',
      name: 'C-3PO',
      episodesIds: [
        '019645e2-eb79-77fb-aa90-45713d40d289',
        '019645e2-eb79-77fb-aa90-4a35b46ae7e2',
        '019645e2-eb79-77fb-aa90-4c47432a6c01',
      ],
      episodes: [],
    },
    {
      id: '01965aac-6389-7102-aaa1-9c6272e2577d',
      name: 'R2-D2',
      episodesIds: [
        '019645e2-eb79-77fb-aa90-45713d40d289',
        '019645e2-eb79-77fb-aa90-4a35b46ae7e2',
        '019645e2-eb79-77fb-aa90-4c47432a6c01',
      ],
      episodes: [],
    },
  ];

  create(createCharacterInput: CreateCharacterInput) {
    const character = new Character();
    character.id = uuidv7();
    character.name = createCharacterInput.name;
    character.episodes = [];
    this.characters.push(character);
    return character;
  }

  findAll(args?: GetCharactersInput) {
    if (args) {
      const sliceStart = args.after;
      const sliceEnd = args.after + args.first;
      return this.characters.slice(sliceStart, sliceEnd);
    }
    return this.characters;
  }

  findOneById(id: string) {
    const foundCharacter = this.characters.find(
      (character) => character.id === id,
    );
    if (!foundCharacter) {
      throw new Error(`Character with id: ${id} not found`);
    }
    return foundCharacter;
  }

  update(id: string, updateCharacterInput: UpdateCharacterInput) {
    const characterToUpdate = this.characters.find(
      (character) => character.id === id,
    );

    if (!characterToUpdate) {
      throw new Error(`Character with id: ${id} not found`);
    }

    characterToUpdate.name = updateCharacterInput.name;
    return characterToUpdate;
  }

  remove(id: string) {
    const characterIndex = this.characters.findIndex(
      (character) => character.id === id,
    );

    if (characterIndex === -1) {
      throw new Error(`Character with id: ${id} not found`);
    }

    return this.characters.splice(characterIndex, 1)[0];
  }
}
