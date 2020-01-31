import {Injectable} from '@angular/core';

import {HttpClient} from '@angular/common/http';

import {catchError, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {maReception} from './models/maReception';
import {Pokemon} from './models/Pokemon';


@Injectable({
  providedIn: 'root'
})
export class PokemonServiceService {

  private pokedexApiUrl = 'http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io/pokemons';

  pokedexApiUrlId;

  constructor(private http: HttpClient) { }


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
      .pipe(tap(Pokemon => console.log('fetched pokemon id = ' + id)),
        catchError(this.handleError<Pokemon>('getPokemon id=${id}' ))
      );
  }

  searchPokemon(search: string, limit: number) {
    console.log(this.pokedexApiUrl + '?search=' + search + '&limit=151');
    return this.http.get<maReception<Pokemon>>(this.pokedexApiUrl + '?search=' + search + '&limit=' + limit).pipe(tap(_ => console.log('fetched pokemon' )),
      catchError(this.handleError<maReception<Pokemon>>('get pokemon')));
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
