import {Component} from '@angular/core';


@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})



export class PokedexComponent {

  idPokemonSelected: number;
  idPokemonAdd: number;

  constructor() {
  }

  onPokemonSelectedId(idPokemon: number) {
    this.idPokemonSelected = idPokemon;
  }

  onPokemonAdd(idPokemon: number) {
    this.idPokemonAdd = idPokemon;
  }
}
