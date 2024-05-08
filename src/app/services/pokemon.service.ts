import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, map, Observable, switchMap } from "rxjs";
import { environment } from "../../environments/environment";
import {
  IPokemon,
  IPokemonEntry,
  IResponsePokemon
} from "../interfaces/pokemon.interface";

@Injectable({
  providedIn: "root"
})
export class PokemonService {
  constructor(private _http: HttpClient) {}

  getPokemons(): Observable<IPokemon[]> {
    return this._http
      .get<IResponsePokemon>(`${environment.apiUrl}/pokedex/2`)
      .pipe(
        map((res: IResponsePokemon) => res.pokemon_entries),
        switchMap((entry: IPokemonEntry[]) => {
          return forkJoin(
            entry.map((pokemon_entry: IPokemonEntry) =>
              this._http
                .get<IPokemon>(
                  `${environment.apiUrl}/pokemon/${pokemon_entry.entry_number}`
                )
                .pipe(map((pokemon: IPokemon) => this.mapPokemon(pokemon)))
            )
          );
        })
      );
  }

  mapPokemon(pokemon: IPokemon): IPokemon {
    const { id, name, height, weight, sprites, types } = pokemon;
    return {
      id,
      name,
      height,
      weight,
      avatar: sprites?.front_default ?? null,
      types
    };
  }
}
