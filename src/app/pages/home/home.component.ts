import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { DisplayItemComponent } from "../../components/display-item/display-item.component";
import { SpinnerComponent } from "../../components/spinner/spinner.component";
import { IPokemon } from "../../interfaces/pokemon.interface";
import { PokemonService } from "../../services/pokemon.service";
import { ListComponent } from "./components/list/list.component";
import { SearchComponent } from "./components/search/search.component";

@Component({
  selector: "poke-home",
  standalone: true,
  imports: [
    CommonModule,
    SearchComponent,
    ListComponent,
    DisplayItemComponent,
    SpinnerComponent
  ],
  providers: [PokemonService],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss"
})
export class HomeComponent implements OnInit, OnDestroy {
  pokemons: IPokemon[] = [];
  pokemonsFiltered: IPokemon[] = [];
  pokemonSelected: IPokemon | null = null;
  generation: number = 1;
  loading: boolean = true;

  // IMAGES
  IMG_POKE_BG: string = "assets/images/pokeball-bg.webp";

  // OBS
  destroy$: Subject<void> = new Subject<void>();

  constructor(private _pokemonSvc: PokemonService) {}

  ngOnInit(): void {
    this.getPokemonSelected();
    this.getPokemons(this.generation);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getPokemons(generation: number): void {
    this.loading = true;
    this._pokemonSvc
      .getPokemons(generation)
      .subscribe((pokemons: IPokemon[]) => {
        this.pokemons = pokemons;
        this.pokemonsFiltered = pokemons;
        this.loading = false;
      });
  }

  filter(query: string): void {
    if (query.length > 0) {
      this.pokemonsFiltered = this.pokemons.filter((pokemon: IPokemon) =>
        pokemon.name.toLowerCase().includes(query.toLowerCase())
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

  changeGeneration(generation: number): void {
    if (generation === 1) this.generation = 2;
    else this.generation = 1;
    this.getPokemons(this.generation);
  }
}
