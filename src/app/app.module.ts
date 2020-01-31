import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {PokemonListComponent} from './pokemon/pokemon-list/pokemon-list.component';
import {MatButtonModule, MatCardModule, MatChipsModule, MatGridListModule, MatIconModule, MatListModule} from '@angular/material';
import { MatSliderModule } from '@angular/material/slider';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';





@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonDetailComponent,
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
    MatIconModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
