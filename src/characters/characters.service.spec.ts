import { Test, TestingModule } from '@nestjs/testing';
import { CharactersService } from './characters.service';
import { Character } from '../graphql';

describe('CharactersService', () => {
  let service: CharactersService;
  const characterData = {
    name: 'Luke Skajłoker',
    id: 'someCharacterId',
    episodes: [],
  };
  const characters: Character[] = [characterData];
  const existingCharacterIdToFind = '019645d4-8273-7758-92d7-f20f20d723be';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharactersService],
    }).compile();

    service = module.get<CharactersService>(CharactersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new character', () => {
    const newCharacter = service.create(characterData);
    expect(newCharacter.name).toEqual(characterData.name);
    expect(newCharacter).toEqual({ ...characterData, id: newCharacter.id });
  });

  it('should return all characters', () => {
    const characters = service.findAll();
    expect(characters.length).toEqual(7);
    expect(characters[0].name).toEqual('Luke Skywalker');
  });

  it('should return characters with pagination', () => {
    const characters = service.findAll({ after: 3, first: 2 });
    expect(characters.length).toEqual(2);
    expect(characters[0].name).toEqual('Leia Organa');
  });

  it('should return a character by id', () => {
    const character = service.findOneById(existingCharacterIdToFind);
    expect(character).toEqual({ ...character, id: existingCharacterIdToFind });
  });

  it('should throw an error when character not found', () => {
    const failedFindOneById = () => {
      service.findOneById('2');
    };
    expect(failedFindOneById).toThrow();
  });

  it('should update a character', () => {
    const character = service.update(existingCharacterIdToFind, characterData);
    expect(character).toEqual({
      ...character,
    });
  });

  it('should throw an error when character to update not found', () => {
    const failedUpdate = () => {
      service.update('non-existent-character', characterData);
    };
    expect(failedUpdate).toThrow();
  });

  it('should remove a character', () => {
    const charactersBefore = service.findAll();
    expect(charactersBefore.length).toEqual(7);

    const character = service.remove(existingCharacterIdToFind);
    expect(character).toEqual({
      ...character,
    });

    const charactersAfter = service.findAll();
    expect(charactersAfter.length).toEqual(6);
  });

  it('should throw an error when character to remove not found', () => {
    const failedRemove = () => {
      service.remove('non-existent-character');
    };
    expect(failedRemove).toThrow();
  });
});
