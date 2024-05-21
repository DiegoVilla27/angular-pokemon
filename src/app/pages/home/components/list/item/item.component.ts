import { CommonModule } from "@angular/common";
import { Component, Input, Renderer2 } from "@angular/core";
import { prominent } from "color.js";
import { Color } from "../../../../../interfaces/colors.interface";
import { IPokemon } from "../../../../../interfaces/pokemon.interface";
import { ColorTypePipe } from "../../../../../pipes/color-type.pipe";
import { GradientBackgroundPipe } from "../../../../../pipes/gradient-background.pipe";
import { IconTypePipe } from "../../../../../pipes/icon-type.pipe";
import { PokemonService } from "../../../../../services/pokemon.service";
import { SkeletonComponent } from "./components/skeleton/skeleton.component";

@Component({
  selector: "poke-item",
  standalone: true,
  imports: [
    CommonModule,
    GradientBackgroundPipe,
    ColorTypePipe,
    IconTypePipe,
    SkeletonComponent
  ],
  templateUrl: "./item.component.html",
  styleUrl: "./item.component.scss"
})
export class ItemComponent {
  // IMAGES
  IMG_POKE: string = "assets/images/pokeball.webp";

  @Input() pokemon!: IPokemon;
  loading: boolean = true;

  constructor(
    private _pokemonSvc: PokemonService,
    private _renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.addColorPokemon();
  }

  async addColorPokemon(): Promise<void> {
    await this.setColorBG(this.pokemon);
  }

  async setColorBG(pokemon: IPokemon): Promise<void> {
    const { info } = pokemon;
    const { sprites } = info!;
    const { other } = sprites;
    const { home } = other!;
    const { front_default } = home;
    await prominent(front_default).then((color: Color) => {
      this.loading = false;
      return (this.pokemon.color = color[1]);
    });
  }

  selectPokemon(pokemon: IPokemon): void {
    this._renderer.setStyle(document.body, "overflow-y", "hidden");
    this._pokemonSvc.setPokemonSelected(pokemon);
  }
}
