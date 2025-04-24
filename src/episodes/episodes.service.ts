import { v7 as uuidv7 } from 'uuid';
import { Injectable } from '@nestjs/common';

import { CreateEpisodeInput } from './dto/create-episode.input';
import { UpdateEpisodeInput } from './dto/update-episode.input';
import { Episode } from '../graphql';

@Injectable()
export class EpisodesService {
  private readonly episodes: Array<Episode> = [
    { id: '019645e2-eb79-77fb-aa90-45713d40d289', name: 'NEWHOPE' },
    { id: '019645e2-eb79-77fb-aa90-4a35b46ae7e2', name: 'EMPIRE' },
    { id: '019645e2-eb79-77fb-aa90-4c47432a6c01', name: 'JEDI' },
  ];

  create(createEpisodeInput: CreateEpisodeInput) {
    const episode = new Episode();
    episode.id = uuidv7();
    episode.name = createEpisodeInput.name;
    this.episodes.push(episode);
    return episode;
  }

  findAll() {
    return this.episodes;
  }

  findOneById(id: string) {
    return this.episodes.find((episode) => episode.id === id);
  }

  update(id: string, updateEpisodeInput: UpdateEpisodeInput) {
    const episodeToUpdate = this.episodes.find((episode) => episode.id === id);

    if (!episodeToUpdate) {
      throw new Error(`Episode with id: ${id} not found`);
    }

    episodeToUpdate.name = updateEpisodeInput.name;
    return episodeToUpdate;
  }

  remove(id: string) {
    // it is still missing the logic to remove the episode from characters
    const episodeIndex = this.episodes.findIndex(
      (episode) => episode.id === id,
    );

    if (episodeIndex === -1) {
      throw new Error(`Episode with id: ${id} not found`);
    }

    return this.episodes.splice(episodeIndex, 1)[0];
  }
}
