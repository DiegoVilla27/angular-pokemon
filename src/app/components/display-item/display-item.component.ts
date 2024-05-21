import { CommonModule } from "@angular/common";
import { Component, Input, Renderer2 } from "@angular/core";
import { IPokemon } from "../../interfaces/pokemon.interface";
import { ColorBackgroundPipe } from "../../pipes/color-background.pipe";
import { ColorTypePipe } from "../../pipes/color-type.pipe";
import { GradientBackgroundPipe } from "../../pipes/gradient-background.pipe";
import { IconTypePipe } from "../../pipes/icon-type.pipe";
import { NameStatsPipe } from "../../pipes/name-stats.pipe";
import { PercentageStatsPipe } from "../../pipes/percentage-stats.pipe";
import { PokemonService } from "../../services/pokemon.service";

@Component({
  selector: "poke-display-item",
  standalone: true,
  imports: [
    CommonModule,
    ColorTypePipe,
    IconTypePipe,
    GradientBackgroundPipe,
    ColorBackgroundPipe,
    NameStatsPipe,
    PercentageStatsPipe
  ],
  templateUrl: "./display-item.component.html",
  styleUrl: "./display-item.component.scss"
})
export class DisplayItemComponent {
  @Input() pokemon!: IPokemon;
  ICON_CLOSE: string = "assets/icons/close.svg";

  constructor(
    private _pokemonSvc: PokemonService,
    private _renderer: Renderer2
  ) {}

  close(): void {
    this._renderer.setStyle(document.body, "overflow-y", "auto");
    this._pokemonSvc.setPokemonSelected(null);
  }
}
