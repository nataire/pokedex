import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { PokemonServiceService } from '../pokemon-service.service';
import {Location} from '@angular/common';
import {Pokemon} from '../models/Pokemon';
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnChanges {

  pokemon: Pokemon;
  id: number;

  @Input()  idPokemonSelected: number;

  @Output() ajoutPokemonTab = new EventEmitter<number>();

  mesPokemonId: Array<number>;


  constructor(private route: ActivatedRoute, private myPokemonService: PokemonServiceService, private location: Location, private cookieService: CookieService) { }


  getPokemon() {
    this.id = +this.idPokemonSelected;
    this.myPokemonService.getPokemon(this.id).subscribe(myResult => this.pokemon = myResult);
  }


  addPokemon(idPokemon: number) {
    this.myPokemonService.recupererPokemon(this.cookieService.get('access_token')).then(data => {
      this.mesPokemonId = data;
      if ( !(this.mesPokemonId === undefined)) {
        if (this.mesPokemonId.length >= 6) {
          console.log('Liste trop longue');
        } else if (!(this.mesPokemonId.indexOf(idPokemon) === -1)) {
          console.log('Pokemon déja présent');
        } else {
          this.mesPokemonId.push(idPokemon);
          this.myPokemonService.modifyListPokemon(this.mesPokemonId, this.cookieService.get('access_token')).subscribe();
          this.ajoutPokemon(idPokemon);

        }
      }
      // continue , because we do not have any data in httpResult
    });
  }


  ajoutPokemon(pokemonSelected: number) {
    this.ajoutPokemonTab.emit(pokemonSelected);
  }

  ngOnChanges() {
    this.getPokemon();
  }

  playMusic() {
    let monSon;
    console.log('lecture musique');
    monSon = document.getElementById('myAudio');
    monSon.play();

  }
}
