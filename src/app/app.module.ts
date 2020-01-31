import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PokemonListComponent} from './pokemon/pokemon-list/pokemon-list.component';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import {MatSliderModule} from '@angular/material/slider';
import {PokemonDetailComponent} from './pokemon/pokemon-detail/pokemon-detail.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {PokedexComponent} from './pokemon/pokedex/pokedex.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonDetailComponent,
    PokedexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatChipsModule,
    MatButtonModule,
    InfiniteScrollModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule


  ],
  providers: [],
  exports: [
    PokemonDetailComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
