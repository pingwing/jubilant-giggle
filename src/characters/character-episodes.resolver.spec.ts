import { Test, TestingModule } from '@nestjs/testing';
import { CharacterEpisodesResolver } from './character-episodes.resolver';
import { EpisodesService } from '../episodes/episodes.service';
import { Character, Episode } from '../graphql';

describe('CharacterEpisodesResolver', () => {
  let resolver: CharacterEpisodesResolver;
  let episodesService: EpisodesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharacterEpisodesResolver,
        {
          provide: EpisodesService,
          useValue: {
            findOneById: jest.fn(), // Mock the findOneById method
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
      const character: Character & { episodesIds: string[] } = {
        episodesIds: ['1', '2'],
      } as any;

      const episode1: Episode = { id: '1', title: 'Episode 1' } as any;
      const episode2: Episode = { id: '2', title: 'Episode 2' } as any;

      jest.spyOn(episodesService, 'findOneById').mockImplementation((id) => {
        if (id === '1') return episode1;
        if (id === '2') return episode2;
        return undefined;
      });

      const result = resolver.episodes(character);
      expect(result).toEqual([episode1, episode2]);
      expect(episodesService.findOneById).toHaveBeenCalledWith('1');
      expect(episodesService.findOneById).toHaveBeenCalledWith('2');
    });

    it('should throw error if episode not found', () => {
      const character: Character & { episodesIds: string[] } = {
        episodesIds: ['3'],
      } as any;

      jest.spyOn(episodesService, 'findOneById').mockReturnValue(undefined);

      expect(() => resolver.episodes(character)).toThrowError(
        'No episode with id 3 found',
      );
      expect(episodesService.findOneById).toHaveBeenCalledWith('3');
    });

    it('should return an empty array if no episode IDs are present', () => {
      const character: Character & { episodesIds: string[] } = {
        episodesIds: [],
      } as any;

      const result = resolver.episodes(character);
      expect(result).toEqual([]);
      expect(episodesService.findOneById).not.toHaveBeenCalled();
    });
  });
});
