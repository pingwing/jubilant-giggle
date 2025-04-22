import { Test, TestingModule } from '@nestjs/testing';
import { EpisodesService } from './episodes.service';
import { Episode } from '../graphql';

describe('EpisodesService', () => {
  let service: EpisodesService;
  const episodeData: Episode = { name: 'PHANTOMMENACE', id: 'non_relevant' };
  const existingEpisodeIdToFind = '019645e2-eb79-77fb-aa90-4a35b46ae7e2';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EpisodesService],
    }).compile();

    service = module.get<EpisodesService>(EpisodesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new episode', () => {
    const newEpisode = service.create(episodeData);
    expect(newEpisode.name).toEqual(episodeData.name);
    expect(newEpisode).toEqual({ ...episodeData, id: newEpisode.id });
  });

  it('should return all episodes', () => {
    const episodes = service.findAll();
    expect(episodes.length).toEqual(3);
    expect(episodes[0].name).toEqual('NEWHOPE');
  });

  it('should return an episode by id', () => {
    const episode = service.findOneById(existingEpisodeIdToFind);
    expect(episode).toEqual({ ...episode, id: existingEpisodeIdToFind });
  });

  it('should return undefined if episode not found', () => {
    const episode = service.findOneById('2');
    expect(episode).toBeUndefined();
  });

  it('should update an episode', () => {
    const episode = service.update(existingEpisodeIdToFind, episodeData);
    expect(episode).toEqual({
      ...episode,
    });
  });

  it('should throw an error when episode to update not found', () => {
    const failedUpdate = () => {
      service.update('non-existent-episode', episodeData);
    };
    expect(failedUpdate).toThrow();
  });

  it('should remove an episode', () => {
    const episodesBefore = service.findAll();
    expect(episodesBefore.length).toEqual(3);

    const episode = service.remove(existingEpisodeIdToFind);
    expect(episode).toEqual({
      ...episode,
    });

    const episodesAfter = service.findAll();
    expect(episodesAfter.length).toEqual(2);
  });

  it('should throw an error when episode to remove not found', () => {
    const failedRemove = () => {
      service.remove('non-existent-episode');
    };
    expect(failedRemove).toThrow();
  });
});
