import { Component } from "@angular/core";
import { SearchComponent } from "./components/search/search.component";
import { ListComponent } from "./components/list/list.component";

@Component({
  selector: "poke-home",
  standalone: true,
  imports: [SearchComponent, ListComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss"
})
export class HomeComponent {}
