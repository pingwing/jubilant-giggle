import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { EpisodesService } from '../episodes/episodes.service';
import { Character, Episode } from '../graphql';

export type CharacterWithEpisodesIds = Character & { episodesIds: string[] };

@Resolver('Character')
export class CharacterEpisodesResolver {
  constructor(private readonly episodesService: EpisodesService) {}

  @ResolveField()
  episodes(@Parent() character: CharacterWithEpisodesIds): Episode[] {
    const foundEpisodes: Episode[] = [];
    if (character.episodesIds && character.episodesIds.length > 0) {
      for (const episodeId of character.episodesIds) {
        const foundEpisode = this.episodesService.findOneById(episodeId);

        if (!foundEpisode) {
          throw new Error(`No episode with id ${episodeId} found`);
        }

        foundEpisodes.push(foundEpisode);
      }
    }

    return foundEpisodes;
  }
}
