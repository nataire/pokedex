import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PokemonListComponent} from './pokemon/pokemon-list/pokemon-list.component';
import {PokemonDetailComponent} from './pokemon/pokemon-detail/pokemon-detail.component';
import {PokedexComponent} from './pokemon/pokedex/pokedex.component';
import {PokemonTeamComponent} from './pokemon/pokemon-team/pokemon-team.component';

const routes: Routes = [
  { path: 'pokemons', component: PokemonListComponent  },
  {path: 'pokemons/:id', component: PokemonDetailComponent },
  {path: 'pokedex', component: PokedexComponent },
  {path: 'maTeam', component: PokemonTeamComponent },


  { path: '', redirectTo: '/pokedex', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
