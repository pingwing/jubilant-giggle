import { CreateCharacterInput } from './create-character.input';

export class UpdateCharacterInput extends CreateCharacterInput {
  id: string;
  episodesIds?: string[];
  planetId?: string;
}
