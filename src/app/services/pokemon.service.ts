import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  BehaviorSubject,
  delay,
  forkJoin,
  map,
  Observable,
  of,
  switchMap
} from "rxjs";
import { environment } from "../../environments/environment";
import {
  Chain,
  IEvolutionChain,
  IGenerationResponse,
  IPokemonApi,
  IPokemonNameUrl,
  IPokemonSpecies
} from "../interfaces/pokemon-api.interface";
import { IPokemon } from "../interfaces/pokemon.interface";

@Injectable({
  providedIn: "root"
})
export class PokemonService {
  pokemonSelected$: BehaviorSubject<IPokemon | null> =
    new BehaviorSubject<IPokemon | null>(null);

  constructor(private _http: HttpClient) {}

  getPokemons(generation: number): Observable<IPokemon[]> {
    return this._http
      .get<IGenerationResponse>(
        `${environment.apiUrl}/generation/${generation}`
      )
      .pipe(
        delay(2000),
        map((generation: IGenerationResponse) =>
          this.sortingPokemon(generation.pokemon_species)
        ),
        switchMap((pokemons: IPokemonNameUrl[]) =>
          this.getEvolutionUrl(pokemons)
        ),
        switchMap((pokemons: IPokemon[]) => this.getEvolution(pokemons)),
        switchMap((pokemons: IPokemon[]) => this.getPokemon(pokemons)),
        map((pokemons: IPokemon[]) => this.findPokemonCurrent(pokemons))
      );
  }

  sortingPokemon(pokemons: IPokemonNameUrl[]): IPokemonNameUrl[] {
    return pokemons.sort((a: IPokemonNameUrl, b: IPokemonNameUrl) => {
      const numA = parseInt(a.url.match(/\/(\d+)\/$/)![1]);
      const numB = parseInt(b.url.match(/\/(\d+)\/$/)![1]);
      return numA - numB;
    });
  }

  getEvolutionUrl(pokemons: IPokemonNameUrl[]): Observable<IPokemon[]> {
    return forkJoin<IPokemon[]>(
      pokemons.map((pokemon: IPokemonNameUrl) => {
        return this._http.get<IPokemonSpecies>(pokemon.url).pipe(
          map((res: IPokemonSpecies) => {
            return {
              ...pokemon,
              evolution_url: res.evolution_chain.url ?? null
            };
          })
        );
      })
    );
  }

  getEvolution(pokemons: IPokemon[]): Observable<IPokemon[]> {
    return forkJoin<IPokemon[]>(
      pokemons.map((pokemon: IPokemon) => {
        return this._http.get<IEvolutionChain>(pokemon.evolution_url!).pipe(
          map((evolutions: IEvolutionChain) =>
            this.extractEvolutions(evolutions.chain)
          ),
          map((evolutions: string[]) => {
            return {
              ...pokemon,
              evolutions
            };
          })
        );
      })
    );
  }

  extractEvolutions(chain: Chain, speciesArray: string[] = []): string[] {
    speciesArray.push(chain.species.name);
    chain.evolves_to.forEach((evolution: Chain) => {
      this.extractEvolutions(evolution, speciesArray);
    });
    return speciesArray;
  }

  getPokemon(pokemons: IPokemon[]): Observable<IPokemon[]> {
    return forkJoin<IPokemon[]>(
      pokemons.map((pokemon: IPokemon) => {
        if (!pokemon.evolutions || pokemon.evolutions.length === 0) {
          return of({
            ...pokemon,
            evolution_data: []
          });
        }
        const evolutionRequests: Observable<IPokemonApi>[] =
          pokemon.evolutions.map((evolution: string) =>
            this._http.get<IPokemonApi>(
              `${environment.apiUrl}/pokemon/${evolution}`
            )
          );
        return forkJoin(evolutionRequests).pipe(
          map((evolution_data: IPokemonApi[]) => ({
            ...pokemon,
            evolution_data
          }))
        );
      })
    );
  }

  findPokemonCurrent(pokemons: IPokemon[]) {
    return pokemons.map((pokemon: IPokemon) => {
      const find: IPokemonApi = pokemon.evolution_data!.find(
        (evolution: IPokemonApi) => evolution.name === pokemon.name
      )!;
      return {
        ...pokemon,
        info: find
      };
    });
  }

  // OBS
  getPokemonSelected(): Observable<IPokemon | null> {
    return this.pokemonSelected$.asObservable();
  }

  setPokemonSelected(pokemon: IPokemon | null): void {
    this.pokemonSelected$.next(pokemon);
  }
}
