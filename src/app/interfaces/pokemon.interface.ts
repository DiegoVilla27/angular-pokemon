import { Rgb } from "./colors.interface";

// LIST
export interface IPokemonList {
  pokemon_species: IPokemonSpecies[];
}

export interface IPokemonEntry {
  entry_number: number;
  pokemon_species: IPokemonSpecies;
  evolution_chain: string | null;
}

export interface IPokemonSpecies {
  name: string;
  url: string;
}

// POKEMON

export interface IPokemon extends IPokemonAvatar {
  height: number;
  id: number;
  name: string;
  types: string[];
  stats: IStats[];
  weight: number;
  evolution_chain: string | null;
  evolutions?: IPokemonAvatar[];
  color?: string | number | Rgb;
}

export interface IStats {
  value: number;
  name: string;
}

// EVOLUTION

export interface IPokemonAvatar {
  avatar: string | null;
}

export interface IEvolutionChain {
  chain: IEvolutionChainData;
}

export interface IEvolutionChainData {
  evolves_to: IEvolutionChainData[];
  species: SpeciesData;
}

export interface SpeciesData {
  name: string;
  url: string;
}

export interface IPokemonEvolutionChain {
  evolution_chain: {
    url: string;
  };
}
