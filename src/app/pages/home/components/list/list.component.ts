import { Component, Input } from "@angular/core";
import { ItemComponent } from "./item/item.component";
import { IPokemon } from "../../../../interfaces/pokemon.interface";
import { CommonModule } from "@angular/common";

@Component({
  selector: "poke-list",
  standalone: true,
  imports: [CommonModule, ItemComponent],
  templateUrl: "./list.component.html",
  styleUrl: "./list.component.scss"
})
export class ListComponent {
  @Input() pokemons: IPokemon[] = [];
}
