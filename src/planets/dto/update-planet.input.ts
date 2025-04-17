import { CreatePlanetInput } from './create-planet.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePlanetInput extends PartialType(CreatePlanetInput) {
  id: number;
}
