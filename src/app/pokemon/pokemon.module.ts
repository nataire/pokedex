import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PokemonListComponent} from './pokemon-list/pokemon-list.component';
import {PokedexComponent} from './pokedex/pokedex.component';
import {MatCardModule, MatFormFieldModule, MatInputModule, MatListModule, MatSidenavModule} from '@angular/material';
import {AppModule} from '../app.module';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [PokemonListComponent, PokedexComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatCardModule,
    MatListModule,
    AppModule,
    InfiniteScrollModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ]
})
export class PokemonModule { }
