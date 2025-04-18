import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { EpisodesService } from '../episodes/episodes.service';
import { Character, Episode } from '../graphql';

@Resolver('Character')
export class CharacterEpisodesResolver {
  constructor(private readonly episodesService: EpisodesService) {}

  @ResolveField()
  episodes(
    @Parent() character: Character & { episodesIds: string },
  ): Episode[] {
    const foundEpisodes: Episode[] = [];
    for (const episodeId of character.episodesIds) {
      const foundEpisode = this.episodesService.findOneById(episodeId);

      if (!foundEpisode) {
        throw new Error(`No episode with id ${episodeId} found`);
      }

      foundEpisodes.push(foundEpisode);
    }

    return foundEpisodes;
  }
}
