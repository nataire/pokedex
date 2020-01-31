import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PokemonListComponent} from './pokemon/pokemon-list/pokemon-list.component';
import {PokemonDetailComponent} from './pokemon-detail/pokemon-detail.component';


const routes: Routes = [
  { path: 'pokemons', component: PokemonListComponent  },
  {path: 'pokemons/:id', component: PokemonDetailComponent },


  { path: '', redirectTo: '/pokemons', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
