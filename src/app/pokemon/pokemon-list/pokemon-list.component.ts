import { Component, OnInit } from '@angular/core';
import {PokemonServiceService} from '../pokemon-service.service';
import {maReception} from '../models/maReception';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  limit: number;
  myPokemonService: PokemonServiceService;
  reception: maReception;

  constructor(pokemonService: PokemonServiceService) {
    this.myPokemonService = pokemonService;
    this.limit = 0;
  }

  getPokemonsService() {
    this.myPokemonService.getPokemons().subscribe(myResult => this.reception = myResult);
  }

  getPokemonsServiceOffset(myOffset: number) {

    this.myPokemonService.getPokemonsOffset(myOffset).subscribe(myResult => this.reception = myResult);

  }

  onScroll() {
    // http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io/pokemons?offset=20&limit=10
    if(this.limit <= 150)
    {
      this.limit += 10;
      this.getPokemonsServiceOffset(this.limit);
    }


  }

  ngOnInit() {
    this.getPokemonsService();
  }

}
