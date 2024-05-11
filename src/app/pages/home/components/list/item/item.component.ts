import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { prominent } from "color.js";
import { GradientBackgroundPipe } from "../../../../../pipes/gradient-background.pipe";
import { ColorTypePipe } from "../../../../../pipes/color-type.pipe";
import { IconTypePipe } from "../../../../../pipes/icon-type.pipe";
import { Color } from "../../../../../interfaces/colors.interface";
import {
  IPokemon,
  IPokemonAvatar,
  IPokemonEntry
} from "../../../../../interfaces/pokemon.interface";
import { PokemonService } from "../../../../../services/pokemon.service";

@Component({
  selector: "poke-item",
  standalone: true,
  imports: [CommonModule, GradientBackgroundPipe, ColorTypePipe, IconTypePipe],
  templateUrl: "./item.component.html",
  styleUrl: "./item.component.scss"
})
export class ItemComponent {
  // IMAGES
  IMG_POKE: string = "assets/images/pokeball.webp";

  @Input() pokemonEntry!: IPokemonEntry;
  pokemon!: IPokemon;
  loading: boolean = true;

  constructor(private _pokemonSvc: PokemonService) {}

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon(): void {
    this._pokemonSvc
      .getPokemon(Number(this.pokemonEntry.entry_number))
      .subscribe((pokemon: IPokemon | IPokemonAvatar) => {
        this.pokemon = pokemon as IPokemon;
        this.pokemon.evolution_chain = this.pokemonEntry.evolution_chain;
        this.setColorBG(this.pokemon.avatar!);
      });
  }

  async setColorBG(avatar: string): Promise<void> {
    await prominent(avatar).then((color: Color) => {
      this.loading = false;
      return (this.pokemon.color = color[1]);
    });
  }

  selectPokemon(pokemon: IPokemon): void {
    this._pokemonSvc.setPokemonSelected(pokemon);
  }
}
