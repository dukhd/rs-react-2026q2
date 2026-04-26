export interface CardData {
  id: string;
  src: string;
  title: string;
  description: string;
}

interface CharacterLocation {
  name: string;
  url: string;
}

export interface CharacterSchemaResponse {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: CharacterLocation;
  location: CharacterLocation;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface AllCharactersSchema {
  info: {
    count: number;
    pages: number;
    next: null | string;
    prev: null | string;
  };
  results: CharacterSchemaResponse[];
}
