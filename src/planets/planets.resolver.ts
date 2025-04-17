import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PlanetsService } from './planets.service';
import { CreatePlanetInput } from './dto/create-planet.input';
import { UpdatePlanetInput } from './dto/update-planet.input';

@Resolver('Planet')
export class PlanetsResolver {
  constructor(private readonly planetsService: PlanetsService) {}

  @Mutation('createPlanet')
  create(@Args('createPlanetInput') createPlanetInput: CreatePlanetInput) {
    return this.planetsService.create(createPlanetInput);
  }

  @Query('planets')
  findAll() {
    return this.planetsService.findAll();
  }

  @Query('planet')
  findOne(@Args('id') id: string) {
    return this.planetsService.findOneById(id);
  }

  @Mutation('updatePlanet')
  update(@Args('updatePlanetInput') updatePlanetInput: UpdatePlanetInput) {
    return this.planetsService.update(updatePlanetInput.id, updatePlanetInput);
  }

  @Mutation('removePlanet')
  remove(@Args('id') id: string) {
    return this.planetsService.remove(id);
  }
}
