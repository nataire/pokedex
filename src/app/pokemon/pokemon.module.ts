import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatFormFieldModule,
  MatGridListModule, MatIconModule,
  MatInputModule,
  MatListModule,
  MatSidenavModule, MatTabsModule
} from '@angular/material';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {FormsModule} from '@angular/forms';
import {PokemonDetailComponent} from './pokemon-detail/pokemon-detail.component';
import {RouterModule} from '@angular/router';
import {PokemonTeamComponent} from './pokemon-team/pokemon-team.component';

@NgModule({
  declarations: [PokemonListComponent, PokemonDetailComponent, PokedexComponent, PokemonTeamComponent],
  exports: [
    PokedexComponent,
    PokemonListComponent,
    PokemonDetailComponent,
    PokemonTeamComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    RouterModule,
    MatCardModule,
    MatGridListModule,
    MatChipsModule,
    MatIconModule,
    InfiniteScrollModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatTabsModule
  ]
})

export class PokemonsModule {}
