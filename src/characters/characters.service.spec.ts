import { Test, TestingModule } from '@nestjs/testing';
import { CharactersService } from './characters.service';
import { EpisodesService } from '../episodes/episodes.service';
import { PlanetsService } from '../planets/planets.service';
import { GetCharactersInput } from './dto/get-characters.input';
import { Character, Episode, Planet } from '../graphql';

describe('CharactersService', () => {
  let service: CharactersService;
  const characterData = {
    name: 'Luke Skajłoker',
    id: 'someCharacterId',
    episodes: [],
  };
  const existingCharacterIdToFind = '019645d4-8273-7758-92d7-f20f20d723be';
  const existingEpisodeId = '019645e2-eb79-77fb-aa90-4a35b46ae7e2';
  const characterWithEmptyEpisodesData = {
    name: 'Luke Otherwolker',
    id: existingCharacterIdToFind,
    episodesIds: [],
    episodes: [],
  };
  const characterWithEpisodesData = {
    name: 'Luke Otherwolker',
    id: existingCharacterIdToFind,
    episodesIds: [existingEpisodeId],
  };
  const characterWithNonCorrectEpisodesData = {
    name: 'Luke Otherwolker',
    id: existingCharacterIdToFind,
    episodesIds: ['non-existent-episode-id'],
    episodes: [],
  };
  const characterWithPlanetData = {
    name: 'Luke Fromoutherspace',
    id: existingCharacterIdToFind,
    planetId: '01964604-7f3b-72b4-884c-e8fc73e86c59',
    episodesIds: [],
    episodes: [],
  };
  const characterWithNonCorrectPlanetData = {
    name: 'Luke Fromoutherspace',
    id: existingCharacterIdToFind,
    planetId: 'some-made-up-planet-id',
    episodesIds: [],
    episodes: [],
  };
  const episodes: Array<Episode> = [{ id: existingEpisodeId, name: 'EMPIRE' }];
  const planets: Array<Planet> = [
    { id: '01964604-7f3b-72b4-884c-e8fc73e86c59', name: 'Alderaan' },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharactersService,
        {
          provide: EpisodesService,
          useValue: {
            findOneById: jest
              .fn()
              .mockImplementation((id: string) =>
                episodes.find((episode) => episode.id === id),
              ),
          },
        },
        {
          provide: PlanetsService,
          useValue: {
            findOneById: jest
              .fn()
              .mockImplementation((id: string) =>
                planets.find((planet) => planet.id === id),
              ),
          },
        },
      ],
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
    const paginationInput = new GetCharactersInput();
    paginationInput.after = 3;
    paginationInput.first = 2;
    const characters = service.findAll(paginationInput);
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
      ...characterData,
      ...character,
    });
  });

  it('should throw an error when character to update not found', () => {
    const failedUpdate = () => {
      service.update('non-existent-character', characterData);
    };
    expect(failedUpdate).toThrow();
  });

  it('should correctly update a character when empty array is passed for episodes', () => {
    const character = service.update(characterWithEmptyEpisodesData.id, {
      ...characterWithEmptyEpisodesData,
    });
    expect(character).toEqual({
      ...characterData,
      ...characterWithEmptyEpisodesData,
    });
  });

  it('should correctly update a character when episodes are passed', () => {
    const character = service.update(characterWithEpisodesData.id, {
      ...characterWithEpisodesData,
    });
    expect(character).toEqual({
      ...characterData,
      ...characterWithEpisodesData,
    });
  });

  it('should throw when non-existent episode id is passed', () => {
    const failedUpdate = () => {
      service.update(
        characterWithNonCorrectEpisodesData.id,
        characterWithNonCorrectEpisodesData,
      );
    };
    expect(failedUpdate).toThrow();
  });

  it('should correctly update a character when planet is passed', () => {
    const character = service.update(characterWithPlanetData.id, {
      ...characterWithPlanetData,
    });
    expect(character).toEqual({
      ...characterData,
      ...characterWithPlanetData,
    });
  });

  it('should throw when non-existent planet id is passed', () => {
    const failedUpdate = () => {
      service.update(
        characterWithNonCorrectPlanetData.id,
        characterWithNonCorrectPlanetData,
      );
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
