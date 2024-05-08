import { Component, OnInit } from "@angular/core";
import { IPokemon } from "../../interfaces/pokemon.interface";
import { PokemonService } from "../../services/pokemon.service";
import { ListComponent } from "./components/list/list.component";
import { SearchComponent } from "./components/search/search.component";

@Component({
  selector: "poke-home",
  standalone: true,
  imports: [SearchComponent, ListComponent],
  providers: [PokemonService],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss"
})
export class HomeComponent implements OnInit {
  pokemons: IPokemon[] = [];
  pokemonsFiltered: IPokemon[] = [];

  // IMAGES
  IMG_POKE_BG: string = "assets/images/pokeball-bg.webp";

  constructor(private _pokemonSvc: PokemonService) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void {
    this._pokemonSvc.getPokemons().subscribe((pokemons: IPokemon[]) => {
      this.pokemons = pokemons;
      this.pokemonsFiltered = pokemons;
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
}
