import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {PokemonServiceService} from '../pokemon-service.service';
import {User} from '../models/User';
import {CookieService} from 'ngx-cookie-service';
import {Pokemon} from '../models/Pokemon';
import {FormControl} from '@angular/forms';
import {resolve} from 'url';

@Component({
  selector: 'app-pokemon-team',
  templateUrl: './pokemon-team.component.html',
  styleUrls: ['./pokemon-team.component.scss']
})
export class PokemonTeamComponent implements OnInit, OnChanges {

  email: string;
  password: string;
  myPokemonService: PokemonServiceService;
  myUser: User;
  mesPokemonId: number[];

  @Output() idPokemon = new EventEmitter<number>();

  @Input()  idPokemonAdd: number;


  selected = new FormControl(0);

  mesPokemonDetail: Array<Pokemon>;

  constructor(private cookieService: CookieService, pokemonService: PokemonServiceService) {
    this.myPokemonService = pokemonService;
  }

 selectPokemon($event){
    this.idPokemon.emit(this.mesPokemonDetail[$event.index].id);
  }

  /*selectPokemon(pokemonSelected: number) {
    this.idPokemon.emit(pokemonSelected);
  }*/
  ngOnInit() {

    if (this.cookieService.get('access_token').length !== 0) {
      this.myUser = new User();
      this.myUser.expires_in = this.cookieService.get('expires_in');
      this.myUser.refresh_token = this.cookieService.get('refresh_token');
      this.myUser.access_token = this.cookieService.get('access_token');
      delete(this.mesPokemonId);
      this.recuperationPokemon();


    }

  }

  ngOnChanges() {
    this.recuperationPokemon();
  }

  onSubmit() {
    this.connexion(this.email, this.password)
  }



  connexion(email: string, password: string) {
    this.myPokemonService.login(email, password).then(data => {
      this.myUser = data;
      if ( !(this.myUser == null) ) {

          const dateNow = new Date();
          dateNow.setSeconds(dateNow.getSeconds() + Number(this.myUser.expires_in));
          this.cookieService.set('access_token', this.myUser.access_token, dateNow);
          this.cookieService.set('refresh_token', this.myUser.refresh_token, dateNow);
         // this.cookieService.set('token/access_token', 'true', dateNow);
          this.recuperationPokemon();
      }
      // continue , because we do not have any data in httpResult
      console.log('attente reponse');
    });

  }

  recuperationPokemon() {
    this.myPokemonService.recupererPokemon(this.cookieService.get('access_token')).then(data => {
      this.mesPokemonId = data;
      if ( !(this.mesPokemonId === undefined)) {

          this.myPokemonService.requestDataFromMultipleSources(this.mesPokemonId).subscribe(responseList => {
            this.mesPokemonDetail = new Array<Pokemon>();

            responseList.forEach((detailPokemon: Pokemon) => {
              this.mesPokemonDetail.push(detailPokemon);
            });
          });
      }
      // continue , because we do not have any data in httpResult
    });
  }

  memoriserEmail($event: string) {
    this.email = $event;
  }
  memoriserPassword($event: string) {
    this.password = $event;
  }

  deconnexion() {
    this.cookieService.deleteAll();
    delete (this.myUser);
  }

  supprimerPokemon(idPokemonDelete: number) {
    const index: number = this.mesPokemonId.indexOf(idPokemonDelete);
    if (index !== -1) {
      this.mesPokemonId.splice(index, 1);
      this.mesPokemonDetail.splice(index, 1);
      this.myPokemonService.modifyListPokemon(this.mesPokemonId, this.cookieService.get('access_token')).subscribe();
      if (this.mesPokemonDetail.length === 0) {
        delete (this.mesPokemonDetail);
      }

    }
  }


}
