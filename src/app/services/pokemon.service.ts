import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, forkJoin, map, Observable, switchMap } from "rxjs";
import { environment } from "../../environments/environment";
import { IPokemonApi, Stat, Type } from "../interfaces/pokemon-api.interface";
import {
  IEvolutionChain,
  IEvolutionChainData,
  IPokemon,
  IPokemonAvatar,
  IPokemonEntry,
  IPokemonEvolutionChain,
  IPokemonList,
  IPokemonSpecies,
  IStats
} from "../interfaces/pokemon.interface";

@Injectable({
  providedIn: "root"
})
export class PokemonService {
  pokemonSelected$: BehaviorSubject<IPokemon | null> =
    new BehaviorSubject<IPokemon | null>(null);

  constructor(private _http: HttpClient) {}

  getPokemons(): Observable<IPokemonEntry[]> {
    return this._http
      .get<IPokemonList>(`${environment.apiUrl}/generation/1`)
      .pipe(
        map<IPokemonList, IPokemonSpecies[]>(
          (list: IPokemonList) => list.pokemon_species
        ),
        map<IPokemonSpecies[], IPokemonSpecies[]>(
          (species: IPokemonSpecies[]) => this.sortingPokemon(species)
        ),
        map<IPokemonSpecies[], IPokemonEntry[]>((species: IPokemonSpecies[]) =>
          this.mapSpeciesToEntry(species)
        ),
        switchMap<IPokemonEntry[], Observable<IPokemonEntry[]>>(
          (pokemonEntry: IPokemonEntry[]) =>
            this.mapEvolutionChain(pokemonEntry)
        )
      );
  }

  getPokemon(
    id: number,
    isAvatar: boolean = false
  ): Observable<IPokemon | IPokemonAvatar> {
    return this._http
      .get<IPokemonApi>(`${environment.apiUrl}/pokemon/${id}`)
      .pipe(
        map<IPokemonApi, IPokemon | IPokemonAvatar>((pokemon: IPokemonApi) =>
          isAvatar ? this.mapPokemonAvatar(pokemon) : this.mapPokemon(pokemon)
        )
      );
  }

  getEvolutions(url: string): Observable<IPokemonAvatar[]> {
    return this._http.get<IEvolutionChain>(url).pipe(
      map<IEvolutionChain, IPokemonSpecies[]>((evolutions: IEvolutionChain) =>
        this.extractEvolutions(evolutions.chain)
      ),
      switchMap<IPokemonSpecies[], Observable<(IPokemon | IPokemonAvatar)[]>>(
        (evolutions: IPokemonSpecies[]) => {
          return forkJoin<(IPokemon | IPokemonAvatar)[]>(
            evolutions.map((evolution: IPokemonSpecies) => {
              const entry_number = evolution.url.match(/\/(\d+)\/$/)![1];
              return this.getPokemon(Number(entry_number), true);
            })
          );
        }
      )
    );
  }

  mapSpeciesToEntry(species: IPokemonSpecies[]): IPokemonEntry[] {
    return species.map<IPokemonEntry>(
      (specie: IPokemonSpecies, index: number) => {
        return {
          entry_number: index + 1,
          pokemon_species: specie,
          evolution_chain: null
        };
      }
    );
  }

  sortingPokemon(pokemons: IPokemonSpecies[]): IPokemonSpecies[] {
    return pokemons.sort((a: IPokemonSpecies, b: IPokemonSpecies) => {
      const numA = parseInt(a.url.match(/\/(\d+)\/$/)![1]);
      const numB = parseInt(b.url.match(/\/(\d+)\/$/)![1]);
      return numA - numB;
    });
  }

  mapEvolutionChain(
    pokemonEntry: IPokemonEntry[]
  ): Observable<IPokemonEntry[]> {
    return forkJoin<IPokemonEntry[]>(
      pokemonEntry.map<Observable<IPokemonEntry>>(
        (pokemonEntry: IPokemonEntry) => {
          return this._http
            .get<IPokemonEvolutionChain>(pokemonEntry.pokemon_species.url)
            .pipe<IPokemonEntry>(
              map<IPokemonEvolutionChain, IPokemonEntry>(
                (res: IPokemonEvolutionChain) => {
                  return {
                    ...pokemonEntry,
                    evolution_chain: res.evolution_chain.url ?? null
                  };
                }
              )
            );
        }
      )
    );
  }

  mapPokemon(pokemon: IPokemonApi): IPokemon {
    const { id, name, height, weight, sprites, types, stats } = pokemon;
    return {
      id,
      name,
      height,
      weight,
      avatar: sprites?.other?.home.front_default ?? null,
      types: [...types.map<string>((type: Type) => type.type.name)],
      evolution_chain: null,
      stats: [
        ...stats.map<IStats>((stat: Stat) => {
          return {
            value: stat.base_stat,
            name: stat.stat.name
          };
        })
      ]
    };
  }

  mapPokemonAvatar(pokemon: IPokemonApi): IPokemonAvatar {
    const { sprites } = pokemon;
    return {
      avatar: sprites?.other?.home.front_default ?? null
    };
  }

  extractEvolutions(
    chain: IEvolutionChainData,
    speciesArray: IPokemonSpecies[] = []
  ): IPokemonSpecies[] {
    speciesArray.push(chain.species);
    chain.evolves_to.forEach((evolution: IEvolutionChainData) => {
      this.extractEvolutions(evolution, speciesArray);
    });
    return speciesArray;
  }

  // OBS
  getPokemonSelected(): Observable<IPokemon | null> {
    return this.pokemonSelected$.asObservable();
  }

  setPokemonSelected(pokemon: IPokemon | null): void {
    this.pokemonSelected$.next(pokemon);
  }
}
