import {Component, Input, OnChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PokemonServiceService} from '../pokemon-service.service';
import {Location} from '@angular/common';
import {Pokemon} from '../models/Pokemon';


@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnChanges {

  pokemon: Pokemon;
  id: number;

  @Input()  idPokemonSelected: number;

  constructor(private route: ActivatedRoute, private myPokemonService: PokemonServiceService, private location: Location) { }


  getPokemon() {
    this.id = +this.idPokemonSelected;
    this.myPokemonService.getPokemon(this.id).subscribe(myResult => this.pokemon = myResult);

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
