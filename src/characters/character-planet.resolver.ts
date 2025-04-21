import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Character, Planet } from '../graphql';
import { PlanetsService } from '../planets/planets.service';

@Resolver('Character')
export class CharacterPlanetResolver {
  constructor(private readonly planetsService: PlanetsService) {}

  @ResolveField()
  planet(
    @Parent() character: Character & { planetId: string },
  ): Planet | undefined {
    return this.planetsService.findOneById(character.planetId);
  }
}
