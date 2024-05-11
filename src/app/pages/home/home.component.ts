import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { DisplayItemComponent } from "../../components/display-item/display-item.component";
import { IPokemon, IPokemonEntry } from "../../interfaces/pokemon.interface";
import { PokemonService } from "../../services/pokemon.service";
import { ListComponent } from "./components/list/list.component";
import { SearchComponent } from "./components/search/search.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: "poke-home",
  standalone: true,
  imports: [CommonModule, SearchComponent, ListComponent, DisplayItemComponent],
  providers: [PokemonService],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss"
})
export class HomeComponent implements OnInit, OnDestroy {
  pokemons: IPokemonEntry[] = [];
  pokemonsFiltered: IPokemonEntry[] = [];
  pokemonSelected: IPokemon | null = null;

  // IMAGES
  IMG_POKE_BG: string = "assets/images/pokeball-bg.webp";

  // OBS
  destroy$: Subject<void> = new Subject<void>();

  constructor(private _pokemonSvc: PokemonService) {}

  ngOnInit(): void {
    this.getPokemonSelected();
    this.getPokemons();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getPokemons(): void {
    this._pokemonSvc.getPokemons().subscribe((pokemons: IPokemonEntry[]) => {
      this.pokemons = pokemons;
      this.pokemonsFiltered = pokemons;
    });
  }

  filter(query: string): void {
    if (query.length > 0) {
      this.pokemonsFiltered = this.pokemons.filter((pokemon: IPokemonEntry) =>
        pokemon.pokemon_species.name.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      this.pokemonsFiltered = this.pokemons;
    }
  }

  getPokemonSelected(): void {
    this._pokemonSvc
      .getPokemonSelected()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (pokemon: IPokemon | null) => (this.pokemonSelected = pokemon)
      );
  }
}
