import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { environment } from "../../environments/environment.development";
import { IResponsePokemon } from "../interfaces/pokemon.interface";
import { PokemonService } from "./pokemon.service";

const pokemonsResponse: IResponsePokemon = {
  "pokemon_entries": [
    {
      "entry_number": 150,
      "pokemon_species": {
        "name": "bulbasaur"
      }
    },
    {
      "entry_number": 151,
      "pokemon_species": {
        "name": "bulbasaur"
      }
    }
  ]
};

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
