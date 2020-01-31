import { Injectable } from '@angular/core';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import {tap, catchError, map} from 'rxjs/operators';
import {BehaviorSubject, forkJoin, Observable, ObservableInput, of} from 'rxjs';
import {maReception} from './models/maReception';
import {Pokemon} from './models/Pokemon';
import {User} from './models/User';
import { HttpHeaders } from '@angular/common/http';
import {Header} from './models/header';

@Injectable({
  providedIn: 'root'
})

export class PokemonServiceService {

  private pokedexApiUrl = 'http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io/pokemons';
  private urlConnexion = 'http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io';

  pokedexApiUrlId: string;

  private myHeader: Header;

  constructor(private http: HttpClient) {
    this.myHeader = new Header();
  }


  getPokemons(): Observable<maReception<Pokemon>> {
    return this.http.get<maReception<Pokemon>>(this.pokedexApiUrl + '?offset=0' + '&limit=20' )
      .pipe(tap(MaReception => console.log('recuperation pokemon OK')),
        catchError(this.handleError<maReception<Pokemon>>('getPokemons'))
      );

  }

  getPokemonsOffset(limit: number): Observable<maReception<Pokemon>> {
    // return this.http.get<maReception>(this.pokedexApiUrl+ '?offset=' + offset + '&limit=10')
    return this.http.get<maReception<Pokemon>>(this.pokedexApiUrl + '?offset=0' + '&limit=' + limit )
      .pipe(tap(MaReception => console.log('recuperation pokemon OK')),
        catchError(this.handleError<maReception<Pokemon>>('getPokemons'))
      );
  }

  getPokemon(id: number): Observable<Pokemon> {
    // TODO: send the message _after_ fetching the hero
    this.pokedexApiUrlId = this.pokedexApiUrl + '/' + id;

    return this.http.get<Pokemon>(this.pokedexApiUrlId)
      .pipe(tap(_ => console.log('fetched pokemon id = ' + id)),
        catchError(this.handleError<Pokemon>('getPokemon id=${id}' ))
      );
  }

  searchPokemon(search: string, limit: number) {
    console.log(this.pokedexApiUrl + '?search=' + search + '&limit=151');
    return this.http.get<maReception<Pokemon>>(this.pokedexApiUrl + '?search=' + search + '&limit=' + limit)
      .pipe(tap(_ => console.log('fetched pokemon' )),
      catchError(this.handleError<maReception<Pokemon>>('get pokemon')));
  }


  login(email: string, password: string): Promise <User> {
    return this.http.post<User>(this.urlConnexion + '/auth/login', { email, password })
      .pipe(tap(_ => console.log('connexion reussi')),
        catchError(this.handleError<User>('echec connexion'))).toPromise();
  }

  recupererPokemon(accessToken: string): Promise<number[]> {

    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + accessToken})
    };

    return this.http.get<number[]>(this.urlConnexion + '/trainers/me/team', httpOptions)
      .pipe(tap(_ => console.log('recuperation Pokemon reussi')),
        catchError(this.handleError<number[]>('echec recuperation pokemon'))).toPromise();
  }


  requestDataFromMultipleSources(mesPokemon: number[]): Observable<any[]> {
    let responses = new Array<any>();
    mesPokemon.forEach((idPokemon: number) => {
      responses.push(this.http.get(this.pokedexApiUrl + '/' + idPokemon));
    });

    return forkJoin(responses);
  }

  modifyListPokemon(mesPokemon: number[], accessToken: string ): Observable<number[]> {
    console.log('liste : ' +  mesPokemon + 'token : ' + accessToken);
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer ' + accessToken})
    };

    return this.http.put<number[]>(this.urlConnexion + '/trainers/me/team', mesPokemon, httpOptions )
      .pipe(tap(_ => console.log('modification liste pokemon reussi')),
        catchError(this.handleError<number[]>('echec modification liste pokemon')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
