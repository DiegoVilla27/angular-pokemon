export interface IPokemonApi {
  height: number;
  id: number;
  name: string;
  species: Species;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
}

export interface Species {
  name: string;
  url: string;
}

export interface Other {
  home: Home;
}

export interface Sprites {
  other?: Other;
}

export interface Home {
  front_default: string;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: Species;
}

export interface Type {
  slot: number;
  type: Species;
}
