import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PokemonServiceService} from '../pokemon-service.service';
import {maReception} from '../models/maReception';
import {NgModel} from '@angular/forms';
import {Pokemon} from '../models/Pokemon';

// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})


export class PokemonListComponent implements OnInit {

  limit: number;

  myPokemonService: PokemonServiceService;
  reception: maReception<Pokemon>;
  @Output() idPokemon = new EventEmitter<number>();

  pokemonName: string;


  constructor(pokemonService: PokemonServiceService) {
    this.myPokemonService = pokemonService;
    this.pokemonName = '';
    this.limit = 20;
  }

  selectPokemon(pokemonSelected: number) {
    this.idPokemon.emit(pokemonSelected);
  }

  getPokemonsService() {
    this.myPokemonService.getPokemons().subscribe(myResult => this.reception = myResult);
  }

  getPokemonsServiceOffset(myOffset: number) {

    this.myPokemonService.getPokemonsOffset(myOffset).subscribe(myResult => this.reception = myResult);

  }

  ngOnInit() {
    this.getPokemonsService();
  }

  onScroll() {
    // http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io/pokemons?offset=20&limit=10
    if (this.limit <= 150 && this.pokemonName.length === 0) {
      this.limit += 10;
      this.getPokemonsServiceOffset(this.limit);
    } else if ( this.limit <= 150) {
      this.limit += 10;
      this.myPokemonService.searchPokemon(this.pokemonName, this.limit).subscribe(myResult => this.reception = myResult);
    }
  }

  searchPokemon($pokemonName: string) {

    this.pokemonName = $pokemonName;
    if ( this.pokemonName.length === 0 ) {
      this.getPokemonsServiceOffset(this.limit);
    } else {
      this.limit = 20;
      this.myPokemonService.searchPokemon(this.pokemonName, this.limit).subscribe(myResult => this.reception = myResult);
    }

  }


}
