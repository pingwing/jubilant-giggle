import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeInput } from './dto/create-episode.input';
import { UpdateEpisodeInput } from './dto/update-episode.input';

@Resolver('Episode')
export class EpisodesResolver {
  constructor(private readonly episodesService: EpisodesService) {}

  @Mutation('createEpisode')
  create(@Args('createEpisodeInput') createEpisodeInput: CreateEpisodeInput) {
    return this.episodesService.create(createEpisodeInput);
  }

  @Query('episodes')
  findAll() {
    return this.episodesService.findAll();
  }

  @Query('episode')
  findOne(@Args('id') id: number) {
    return this.episodesService.findOne(id);
  }

  @Mutation('updateEpisode')
  update(@Args('updateEpisodeInput') updateEpisodeInput: UpdateEpisodeInput) {
    return this.episodesService.update(updateEpisodeInput.id, updateEpisodeInput);
  }

  @Mutation('removeEpisode')
  remove(@Args('id') id: number) {
    return this.episodesService.remove(id);
  }
}
