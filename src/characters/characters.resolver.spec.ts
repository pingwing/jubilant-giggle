import { Test, TestingModule } from '@nestjs/testing';
import { CharactersResolver } from './characters.resolver';
import { CharactersService } from './characters.service';

const characterData = { name: 'Luke Skajłoker' };
const existingCharacterId = '01965aac-6389-7102-aaa1-953cf11d64af';

describe('CharactersResolver', () => {
  let resolver: CharactersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharactersResolver, CharactersService],
    }).compile();

    resolver = module.get<CharactersResolver>(CharactersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return all characters', () => {
    const characters = resolver.findAll();
    expect(characters.length).toEqual(7);
    expect(characters[0].name).toEqual('Luke Skywalker');
  });

  it('should return a character by id', () => {
    const character = resolver.findOneById(existingCharacterId);
    expect(character).toEqual({ ...character, id: existingCharacterId });
  });

  it('should throw an error when not found', () => {
    const findOneById = () => {
      resolver.findOneById('nonExistentId');
    };
    expect(findOneById).toThrow();
  });

  it('should create a new character', () => {
    const newCharacter = resolver.create({
      name: characterData.name,
    });
    expect(newCharacter.name).toEqual(characterData.name);
  });

  it('should update a character', () => {
    const character = resolver.update({
      ...characterData,
      id: existingCharacterId,
    });
    expect(character).toEqual({
      episodes: [],
      episodesIds: ['019645e2-eb79-77fb-aa90-45713d40d289'],
      ...characterData,
      id: existingCharacterId,
    });
  });

  it('should throw an error in update when not found', () => {
    const update = () => {
      resolver.update({ id: 'nonExistentId', name: 'John Doe' });
    };
    expect(update).toThrow();
  });

  it('should remove a character', () => {
    const charactersBeforeRemoving = resolver.findAll();
    expect(charactersBeforeRemoving.length).toEqual(7);

    resolver.remove(existingCharacterId);

    const charactersAfterRemoving = resolver.findAll();
    expect(charactersAfterRemoving.length).toEqual(6);
  });

  it('should throw an error in remove when not found', () => {
    const remove = () => {
      resolver.remove('nonExistentId');
    };
    expect(remove).toThrow();
  });
});
