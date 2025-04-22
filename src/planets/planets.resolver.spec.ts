import { Test, TestingModule } from '@nestjs/testing';
import { PlanetsResolver } from './planets.resolver';
import { PlanetsService } from './planets.service';
import { Planet } from '../graphql';

describe('PlanetsResolver', () => {
  let resolver: PlanetsResolver;
  const planet: Planet = { name: 'Earth', id: 'non_relevant' };
  const existingPlanetIdToFind = '01964604-7f3b-72b4-884c-e8fc73e86c59';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanetsResolver,
        {
          provide: PlanetsService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((planet: Planet) => ({ ...planet, id: 1 })),
            findAll: jest.fn().mockReturnValue([planet]),
            findOneById: jest
              .fn()
              .mockImplementation((id: number) => ({ ...planet, id })),
          },
        },
      ],
    }).compile();

    resolver = module.get<PlanetsResolver>(PlanetsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a new planet', () => {
    const newPlanet = resolver.create({
      name: planet.name,
    });
    expect(newPlanet.name).toEqual(planet.name);
    expect(newPlanet).toEqual({ ...planet, id: newPlanet.id });
  });

  it('should return all planets', () => {
    const planets = resolver.findAll();
    expect(planets.length).toEqual(1);
    expect(planets[0].name).toEqual(planet.name);
  });

  it('should return a planet by id', () => {
    const planet = resolver.findOneById(existingPlanetIdToFind);
    expect(planet).toEqual({ ...planet, id: existingPlanetIdToFind });
  });
});
