import { Test, TestingModule } from '@nestjs/testing';
import { PlanetsService } from './planets.service';
import { Planet } from '../graphql';

describe('PlanetsService', () => {
  let service: PlanetsService;
  const planet: Planet = { name: 'Earth', id: 'non_relevant' };
  const existingPlanetIdToFind = '01964604-7f3b-72b4-884c-e8fc73e86c59';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanetsService],
    }).compile();

    service = module.get<PlanetsService>(PlanetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new planet', () => {
    const newPlanet = service.create(planet);
    expect(newPlanet.name).toEqual(planet.name);
    expect(newPlanet).toEqual({ ...planet, id: newPlanet.id });
  });

  it('should return all planets', () => {
    const planets = service.findAll();
    expect(planets.length).toEqual(1);
    expect(planets[0].name).toEqual('Alderaan');
  });

  it('should return an planet by id', () => {
    const planet = service.findOneById(existingPlanetIdToFind);
    expect(planet).toEqual({ ...planet, id: existingPlanetIdToFind });
  });

  it('should return undefined if planet not found', () => {
    const planet = service.findOneById('2');
    expect(planet).toBeUndefined();
  });
});
