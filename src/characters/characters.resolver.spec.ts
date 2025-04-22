import { Test, TestingModule } from '@nestjs/testing';
import { CharactersResolver } from './characters.resolver';
import { Character } from '../graphql';
import { CharactersService } from './characters.service';

const characterData = {
  name: 'Luke Skajłoker',
  id: 'someCharacterId',
  episodes: [],
};
const characters: Character[] = [characterData];

describe('CharactersResolver', () => {
  let resolver: CharactersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharactersResolver,
        {
          provide: CharactersService,
          useValue: {
            create: jest.fn().mockImplementation((character: Character) => ({
              ...character,
              id: '1',
              episodes: [],
            })),
            findAll: jest.fn().mockReturnValue(characters),
            findOneById: jest
              .fn()
              .mockImplementation((id: string) =>
                characters.find((character) => character.id === id),
              ),
            update: jest
              .fn()
              .mockImplementation((id: string, character: Character) => {
                const characterToUpdate = characters.find(
                  (character) => character.id === id,
                );

                return { ...characterToUpdate, name: character.name };
              }),
            remove: jest.fn().mockImplementation(() => {
              return characterData;
            }),
          },
        },
      ],
    }).compile();

    resolver = module.get<CharactersResolver>(CharactersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return all characters', () => {
    const characters = resolver.findAll();
    expect(characters.length).toEqual(1);
    expect(characters[0].name).toEqual(characterData.name);
  });

  it('should return a character by id', () => {
    const character = resolver.findOneById(characterData.id);
    expect(character).toEqual({ ...character, id: characterData.id });
  });

  it('should create a new character', () => {
    const newCharacter = resolver.create({
      name: characterData.name,
    });
    expect(newCharacter.name).toEqual(characterData.name);
    expect(newCharacter).toEqual({ ...characterData, id: newCharacter.id });
  });

  it('should update a character', () => {
    const character = resolver.update({
      ...characterData,
    });
    expect(character).toEqual({
      ...characterData,
    });
  });

  it('should remove a character', () => {
    const character = resolver.remove(characterData.id);
    expect(character).toEqual({
      ...characterData,
    });
  });
});
