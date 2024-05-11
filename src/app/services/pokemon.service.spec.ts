import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { environment } from "../../environments/environment.development";
import { IPokemonList } from "../interfaces/pokemon.interface";
import { PokemonService } from "./pokemon.service";

const pokemonsResponse: IPokemonList = {
  "pokemon_species": [
    {
      "name": "bulbasaur",
      "url": "https://pokeapi.co/api/v2/pokemon-species/1/"
    },
    {
      "name": "bulbasaur",
      "url": "https://pokeapi.co/api/v2/pokemon-species/1/"
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
      `${environment.apiUrl}/generation/1`
    );
    req.flush(pokemonsResponse);
    expect(req.request.method).toEqual("GET");
  });
});
