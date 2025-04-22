import { Test, TestingModule } from '@nestjs/testing';
import { EpisodesResolver } from './episodes.resolver';
import { EpisodesService } from './episodes.service';
import { Episode } from '../graphql';

describe('EpisodesResolver', () => {
  let resolver: EpisodesResolver;
  const episodeData: Episode = { name: 'PHANTOMMENACE', id: 'phantomMenaceId' };
  const episodes: Episode[] = [episodeData];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EpisodesResolver,
        {
          provide: EpisodesService,
          useValue: {
            create: jest.fn().mockImplementation((episode: Episode) => ({
              ...episode,
              id: '1',
            })),
            findAll: jest.fn().mockReturnValue(episodes),
            findOneById: jest
              .fn()
              .mockImplementation((id: string) =>
                episodes.find((episode) => episode.id === id),
              ),
            update: jest
              .fn()
              .mockImplementation((_id: string, episode: Episode) => {
                return episode;
              }),
            remove: jest.fn().mockImplementation(() => {
              return episodeData;
            }),
          },
        },
      ],
    }).compile();

    resolver = module.get<EpisodesResolver>(EpisodesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return all episodes', () => {
    const episodes = resolver.findAll();
    expect(episodes.length).toEqual(1);
    expect(episodes[0].name).toEqual(episodeData.name);
  });

  it('should return an episode by id', () => {
    const episode = resolver.findOneById(episodeData.id);
    expect(episode).toEqual({ ...episodeData });
  });

  it('should create a new episode', () => {
    const newEpisode = resolver.create({
      name: episodeData.name,
    });
    expect(newEpisode.name).toEqual(episodeData.name);
    expect(newEpisode).toEqual({ ...episodeData, id: newEpisode.id });
  });

  it('should update an episode', () => {
    const episode = resolver.update(episodeData);
    expect(episode).toEqual({
      ...episodeData,
    });
  });

  it('should remove an episode', () => {
    const episode = resolver.remove(episodeData.id);
    expect(episode).toEqual({
      ...episodeData,
    });
  });
});
