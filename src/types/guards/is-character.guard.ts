import type { CharacterSchema } from '../interfaces';

export function isCharacter(data: unknown): data is CharacterSchema {
  if (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'name' in data &&
    'image' in data &&
    'status' in data
  ) {
    return true;
  } else {
    return false;
  }
}
