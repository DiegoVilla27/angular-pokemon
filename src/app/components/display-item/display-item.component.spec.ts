import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { IPokemon } from "../../interfaces/pokemon.interface";
import { PokemonService } from "../../services/pokemon.service";
import { DisplayItemComponent } from "./display-item.component";

describe("DisplayItemComponent", () => {
  let component: DisplayItemComponent;
  let fixture: ComponentFixture<DisplayItemComponent>;
  const pokemon: IPokemon = {
    "name": "bulbasaur",
    "url": "https://pokeapi.co/api/v2/pokemon-species/1/",
    "evolution_url": "https://pokeapi.co/api/v2/evolution-chain/1/",
    "evolutions": ["bulbasaur", "ivysaur", "venusaur"],
    "evolution_data": [
      {
        "height": 7,
        "id": 1,
        "name": "bulbasaur",
        "sprites": {
          "other": {
            "home": {
              "front_default":
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png"
            }
          }
        },
        "stats": [
          {
            "base_stat": 45,
            "stat": {
              "name": "hp",
              "url": "https://pokeapi.co/api/v2/stat/1/"
            }
          }
        ],
        "types": [
          {
            "type": {
              "name": "grass",
              "url": "https://pokeapi.co/api/v2/type/12/"
            }
          }
        ],
        "weight": 69
      }
    ],
    "info": {
      "height": 7,
      "id": 1,
      "name": "bulbasaur",
      "sprites": {
        "other": {
          "home": {
            "front_default":
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png"
          }
        }
      },
      "stats": [
        {
          "base_stat": 45,
          "stat": {
            "name": "hp",
            "url": "https://pokeapi.co/api/v2/stat/1/"
          }
        }
      ],
      "types": [
        {
          "type": {
            "name": "grass",
            "url": "https://pokeapi.co/api/v2/type/12/"
          }
        }
      ],
      "weight": 69
    },
    "color": [120, 200, 180]
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
