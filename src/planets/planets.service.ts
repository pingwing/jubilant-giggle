import { v7 as uuidv7 } from 'uuid';
import { Injectable } from '@nestjs/common';

import { CreatePlanetInput } from './dto/create-planet.input';
import { UpdatePlanetInput } from './dto/update-planet.input';
import { Planet } from '../graphql';

@Injectable()
export class PlanetsService {
  private readonly planets: Array<Planet> = [
    { id: '01964604-7f3b-72b4-884c-e8fc73e86c59', name: 'Alderaan' },
  ];

  create(createPlanetInput: CreatePlanetInput) {
    const planet = new Planet();
    planet.id = uuidv7();
    planet.name = createPlanetInput.name;
    this.planets.push(planet);
    return planet;
  }

  findAll() {
    return this.planets;
  }

  findOneById(id: string) {
    return this.planets.find((planet) => planet.id === id);
  }

  update(id: string, updatePlanetInput: UpdatePlanetInput) {
    const planetToUpdate = this.planets.find((planet) => planet.id === id);

    if (!planetToUpdate) {
      throw new Error(`Planet with id #${id} not found`);
    }

    planetToUpdate.name = updatePlanetInput.name;
    return planetToUpdate;
  }

  remove(id: string) {
    const planetIndex = this.planets.findIndex((planet) => planet.id === id);

    if (planetIndex === -1) {
      throw new Error(`Planet with id #${id} not found`);
    }

    return this.planets.splice(planetIndex, 1)[0];
  }
}
