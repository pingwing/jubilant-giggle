import { Test, TestingModule } from '@nestjs/testing';
import { CharacterPlanetResolver } from './character-planet.resolver';
import { PlanetsService } from '../planets/planets.service';
import { Character, Planet } from '../graphql';

describe('CharacterPlanetResolver', () => {
  let resolver: CharacterPlanetResolver;
  let planetsService: PlanetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharacterPlanetResolver,
        {
          provide: PlanetsService,
          useValue: {
            findOneById: jest.fn(), // Mocking the findOneById method
          },
        },
      ],
    }).compile();

    resolver = module.get<CharacterPlanetResolver>(CharacterPlanetResolver);
    planetsService = module.get<PlanetsService>(PlanetsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('planet', () => {
    it('should return a planet by ID', () => {
      const character: Character & { planetId: string } = {
        planetId: '1',
      } as any;

      const planet: Planet = { id: '1', name: 'Tatooine' } as any;
      jest.spyOn(planetsService, 'findOneById').mockReturnValue(planet);

      const result = resolver.planet(character);
      expect(result).toBe(planet);
      expect(planetsService.findOneById).toHaveBeenCalledWith('1');
    });

    it('should return undefined if planet not found', () => {
      const character: Character & { planetId: string } = {
        planetId: '2',
      } as any;

      jest.spyOn(planetsService, 'findOneById').mockReturnValue(undefined);

      const result = resolver.planet(character);
      expect(result).toBeUndefined();
      expect(planetsService.findOneById).toHaveBeenCalledWith('2');
    });
  });
});
