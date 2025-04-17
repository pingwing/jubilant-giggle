import { v7 as uuidv7 } from 'uuid';
import { Injectable } from '@nestjs/common';

import { CreateEpisodeInput } from './dto/create-episode.input';
import { UpdateEpisodeInput } from './dto/update-episode.input';
import { Episode } from '../graphql';

@Injectable()
export class EpisodesService {
  private readonly episodes: Array<Episode> = [
    { id: uuidv7(), name: 'NEWHOPE' },
    { id: uuidv7(), name: 'EMPIRE' },
    { id: uuidv7(), name: 'JEDI' },
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

  findOne(id: string) {
    return `This action returns a #${id} episode`;
  }

  update(id: string, updateEpisodeInput: UpdateEpisodeInput) {
    const episodeToUpdate = this.episodes.find((episode) => episode.id === id);

    if (!episodeToUpdate) {
      throw new Error(`Episode with id #${id} not found`);
    }

    episodeToUpdate.name = updateEpisodeInput.name;
    return episodeToUpdate;
  }

  remove(id: string) {
    return `This action removes a #${id} episode`;
  }
}
