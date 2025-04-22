import { Test, TestingModule } from '@nestjs/testing';
import { PlanetsService } from './planets.service';
import { Planet } from '../graphql';

describe('PlanetsService', () => {
  let service: PlanetsService;
  const planetData: Planet = { name: 'Earth', id: 'non_relevant' };
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
    const newPlanet = service.create(planetData);
    expect(newPlanet.name).toEqual(planetData.name);
    expect(newPlanet).toEqual({ ...planetData, id: newPlanet.id });
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

  it('should update a planet', () => {
    const planet = service.update(existingPlanetIdToFind, planetData);
    expect(planet).toEqual({
      ...planet,
    });
  });

  it('should throw an error when planet to update not found', () => {
    const failedUpdate = () => {
      service.update('non-existent-planet', planetData);
    };
    expect(failedUpdate).toThrow();
  });

  it('should remove a planet', () => {
    const planetsBefore = service.findAll();
    expect(planetsBefore.length).toEqual(1);

    const planet = service.remove(existingPlanetIdToFind);
    expect(planet).toEqual({
      ...planet,
    });

    const planetsAfter = service.findAll();
    expect(planetsAfter.length).toEqual(0);
  });

  it('should throw an error when planet to remove not found', () => {
    const failedRemove = () => {
      service.remove('non-existent-planet');
    };
    expect(failedRemove).toThrow();
  });
});
