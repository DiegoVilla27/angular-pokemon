import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { prominent } from "color.js";
import { GetColorBackgroundPipe } from "../../../../../../pipes/get-color-background.pipe";
import { GetColorByTypePokemonPipe } from "../../../../../../pipes/get-color-by-type-pokemon.pipe";
import { GetIconByTypePokemonPipe } from "../../../../../../pipes/get-icon-by-type-pokemon.pipe";
import { IPokemon } from "../../../../../interfaces/pokemon.interface";
import { Color } from "../../../../../interfaces/colors.interface";

@Component({
  selector: "poke-item",
  standalone: true,
  imports: [
    CommonModule,
    GetColorBackgroundPipe,
    GetColorByTypePokemonPipe,
    GetIconByTypePokemonPipe
  ],
  templateUrl: "./item.component.html",
  styleUrl: "./item.component.scss"
})
export class ItemComponent {
  @Input() pokemon!: IPokemon;

  ngOnInit(): void {
    this.setColorBG(this.pokemon.avatar!);
  }

  async setColorBG(avatar: string): Promise<void> {
    await prominent(avatar).then(
      (color: Color) => (this.pokemon.color = color[2])
    );
  }
}
