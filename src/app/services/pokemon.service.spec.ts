import { TestBed } from "@angular/core/testing";
import { PokemonService } from "./pokemon.service";
import { IResponsePokemon } from "../interfaces/pokemon.interface";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { environment } from "../../environments/environment.development";

const pokemonsResponse: IResponsePokemon = {
  "pokemon_entries": [
    {
      "entry_number": 150,
      "pokemon_species": {
        "name": "mewtwo"
      }
    },
    {
      "entry_number": 151,
      "pokemon_species": {
        "name": "mew"
      }
    }
  ]
};

/*const pokemonsExpected: IPokemon[] = [
  {
    "id": 145,
    "name": "zapdos",
    "height": 16,
    "weight": 526,
    "avatar":
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/145.png",
    "types": [
      {
        "type": {
          "name": "electric"
        }
      },
      {
        "type": {
          "name": "flying"
        }
      }
    ],
    "color": [255, 220, 60]
  },
  {
    "id": 150,
    "name": "mewtwo",
    "height": 20,
    "weight": 1220,
    "avatar":
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png",
    "types": [
      {
        "type": {
          "name": "psychic"
        }
      }
    ],
    "color": [180, 180, 200]
  }
];*/

describe("PokemonService", () => {
  let service: PokemonService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService]
    });
    service = TestBed.inject(PokemonService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("Verify getPokemonList GET", () => {
    service.getPokemons().subscribe();
    const req = httpTestingController.expectOne(
      `${environment.apiUrl}/pokedex/2`
    );
    req.flush(pokemonsResponse);
    expect(req.request.method).toEqual("GET");
  });
});
