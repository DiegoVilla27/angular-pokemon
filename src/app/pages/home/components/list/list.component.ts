import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { IPokemonEntry } from "../../../../interfaces/pokemon.interface";
import { ItemComponent } from "./item/item.component";

@Component({
  selector: "poke-list",
  standalone: true,
  imports: [CommonModule, ItemComponent],
  templateUrl: "./list.component.html",
  styleUrl: "./list.component.scss"
})
export class ListComponent {
  @Input() pokemonsEntry: IPokemonEntry[] = [];
}
