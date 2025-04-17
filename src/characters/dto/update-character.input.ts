import { CreateCharacterInput } from './create-character.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCharacterInput extends PartialType(CreateCharacterInput) {
  id: number;
}
