import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { PokemonServiceService } from '../pokemon/pokemon-service.service';
import {Location} from '@angular/common';
import {Pokemon} from '../pokemon/models/Pokemon';


@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  pokemon: Pokemon;
  breakpoint: number;
  id: number;
  constructor(private route: ActivatedRoute, private myPokemonService: PokemonServiceService, private location: Location) { }

  getPokemon() {
    this.id =  +this.route.snapshot.paramMap.get('id');
    this.myPokemonService.getPokemon(this.id).subscribe(myResult => this.pokemon = myResult);

  }

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    this.getPokemon();
  }

  playMusic() {
    let monSon;
    monSon = document.getElementById("myAudio");
    monSon.play();

  }
}
