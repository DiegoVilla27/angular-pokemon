import { Rgb } from "./colors.interface";

export interface IResponsePokemon {
  pokemon_entries: IPokemonEntry[];
}

export interface IPokemonEntry {
  entry_number: number;
  pokemon_species: IPokemonEspecies;
}

export interface IPokemonEspecies {
  name: string;
}

export interface IPokemon {
  height: number;
  id: number;
  name: string;
  avatar: string | null;
  types: ITypePokemon[];
  weight: number;
  sprites?: Sprites;
  color?: string | number | Rgb;
}

interface Sprites {
  front_default: string;
}

interface ITypePokemon {
  type: IType;
}

interface IType {
  name: string;
}
