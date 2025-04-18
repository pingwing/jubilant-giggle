import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Character, Planet } from '../graphql';
import { PlanetsService } from '../planets/planets.service';

@Resolver('Character')
export class CharacterPlanetResolver {
  constructor(private readonly planetsService: PlanetsService) {}

  @ResolveField()
  planet(@Parent() character: Character & { planetId: string }): Planet {
    console.log('PINGWING: 11 character', character);
    const foundPlanet = this.planetsService.findOneById(character.planetId);

    if (!foundPlanet) {
      throw new Error(`No planet with id ${character.planetId} found`);
    }

    return foundPlanet;
  }
}
