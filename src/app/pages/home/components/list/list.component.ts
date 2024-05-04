import { Component } from "@angular/core";
import { ItemComponent } from "./item/item.component";

@Component({
  selector: "poke-list",
  standalone: true,
  imports: [ItemComponent],
  templateUrl: "./list.component.html",
  styleUrl: "./list.component.scss"
})
export class ListComponent {}
