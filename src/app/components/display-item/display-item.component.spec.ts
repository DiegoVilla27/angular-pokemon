import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { PokemonService } from "../../services/pokemon.service";
import { DisplayItemComponent } from "./display-item.component";
import { IPokemon } from "../../interfaces/pokemon.interface";

describe("DisplayItemComponent", () => {
  let component: DisplayItemComponent;
  let fixture: ComponentFixture<DisplayItemComponent>;
  const pokemon: IPokemon = {
    "id": 2,
    "name": "ivysaur",
    "height": 10,
    "weight": 130,
    "avatar":
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/2.png",
    "types": ["grass", "poison"],
    "evolution_chain": "https://pokeapi.co/api/v2/evolution-chain/1/",
    "stats": [
      {
        "value": 60,
        "name": "hp"
      },
      {
        "value": 62,
        "name": "attack"
      },
      {
        "value": 63,
        "name": "defense"
      },
      {
        "value": 80,
        "name": "special-attack"
      },
      {
        "value": 80,
        "name": "special-defense"
      },
      {
        "value": 60,
        "name": "speed"
      }
    ],
    "color": [60, 140, 40],
    "evolutions": [
      {
        "avatar":
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png"
      },
      {
        "avatar":
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/2.png"
      },
      {
        "avatar":
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/3.png"
      }
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, DisplayItemComponent],
      providers: [PokemonService]
    }).compileComponents();
    fixture = TestBed.createComponent(DisplayItemComponent);
    component = fixture.componentInstance;
    component.pokemon = pokemon;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
