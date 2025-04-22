import { Test, TestingModule } from '@nestjs/testing';
import {
  CharacterEpisodesResolver,
  CharacterWithEpisodesIds,
} from './character-episodes.resolver';
import { EpisodesService } from '../episodes/episodes.service';
import { Episode } from '../graphql';

describe('CharacterEpisodesResolver', () => {
  let resolver: CharacterEpisodesResolver;
  let episodesService: EpisodesService;
  let episodesServiceFindOneByIdMock = jest.fn();

  beforeEach(async () => {
    episodesServiceFindOneByIdMock = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharacterEpisodesResolver,
        {
          provide: EpisodesService,
          useValue: {
            findOneById: episodesServiceFindOneByIdMock, // Mock the findOneById method
          },
        },
      ],
    }).compile();

    resolver = module.get<CharacterEpisodesResolver>(CharacterEpisodesResolver);
    episodesService = module.get<EpisodesService>(EpisodesService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('episodes', () => {
    it('should return episodes by IDs', () => {
      const character: CharacterWithEpisodesIds = {
        id: 'not-existent',
        name: 'non-relevant',
        episodes: [],
        episodesIds: ['1', '2'],
      };

      const episode1: Episode = { id: '1', name: 'Episode 1' };
      const episode2: Episode = { id: '2', name: 'Episode 2' };

      jest.spyOn(episodesService, 'findOneById').mockImplementation((id) => {
        if (id === '1') return episode1;
        if (id === '2') return episode2;
        return undefined;
      });

      const result = resolver.episodes(character);
      expect(result).toEqual([episode1, episode2]);
      expect(episodesServiceFindOneByIdMock).toHaveBeenCalledWith('1');
      expect(episodesServiceFindOneByIdMock).toHaveBeenCalledWith('2');
    });

    it('should throw error if episode not found', () => {
      const character: CharacterWithEpisodesIds = {
        id: 'not-existent',
        name: 'non-relevant',
        episodes: [],
        episodesIds: ['3'],
      };

      jest.spyOn(episodesService, 'findOneById').mockReturnValue(undefined);

      expect(() => resolver.episodes(character)).toThrow(
        'No episode with id 3 found',
      );
      expect(episodesServiceFindOneByIdMock).toHaveBeenCalledWith('3');
    });

    it('should return an empty array if no episode IDs are present', () => {
      const character: CharacterWithEpisodesIds = {
        id: 'not-existent',
        name: 'non-relevant',
        episodes: [],
        episodesIds: [],
      };

      const result = resolver.episodes(character);
      expect(result).toEqual([]);
      expect(episodesServiceFindOneByIdMock).not.toHaveBeenCalled();
    });
  });
});
