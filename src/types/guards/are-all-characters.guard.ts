import type { AllCharactersSchema } from '../interfaces';
import { isCharacter } from './is-character.guard';

export function areAllCharacters(data: unknown): data is AllCharactersSchema {
  if (
    typeof data === 'object' &&
    data !== null &&
    'info' in data &&
    typeof data.info === 'object' &&
    data.info !== null &&
    'results' in data &&
    Array.isArray(data.results) &&
    data.results !== null &&
    data.results.every(isCharacter)
  ) {
    return true;
  } else {
    return false;
  }
}
