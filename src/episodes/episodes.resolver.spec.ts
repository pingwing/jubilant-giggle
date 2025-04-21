import { Test, TestingModule } from '@nestjs/testing';
import { EpisodesResolver } from './episodes.resolver';
import { EpisodesService } from './episodes.service';
import { Episode, Planet } from '../graphql';

describe('EpisodesResolver', () => {
  let resolver: EpisodesResolver;
  const episode: Episode = { name: 'PHANTOMMENACE', id: 'non_relevant' };
  const existingEpisodeIdToFind = '019645e2-eb79-77fb-aa90-4a35b46ae7e2';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EpisodesResolver,
        {
          provide: EpisodesService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((episode: Planet) => ({ ...episode, id: 1 })),
            findAll: jest.fn().mockReturnValue([episode]),
            findOneById: jest
              .fn()
              .mockImplementation((id: number) => ({ ...episode, id })),
          },
        },
      ],
    }).compile();

    resolver = module.get<EpisodesResolver>(EpisodesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a new episode', () => {
    const newEpisode = resolver.create({
      name: episode.name,
    });
    expect(newEpisode.name).toEqual(episode.name);
    expect(newEpisode).toEqual({ ...episode, id: newEpisode.id });
  });

  it('should return all episodes', () => {
    const episodes = resolver.findAll();
    expect(episodes.length).toEqual(1);
    expect(episodes[0].name).toEqual(episode.name);
  });

  it('should return an episode by id', () => {
    const episode = resolver.findOne(existingEpisodeIdToFind);
    expect(episode).toEqual({ ...episode, id: existingEpisodeIdToFind });
  });
});
