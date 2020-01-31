import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenavContainer} from '@angular/material';


@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})



export class PokedexComponent implements OnInit, AfterViewInit {

  idPokemonSelected: number
  constructor() {
  }

  // @ts-ignore
  @ViewChild(MatSidenavContainer) sidenavContainer: MatSidenavContainer;

  ngAfterViewInit() {
    this.sidenavContainer.scrollable.elementScrolled().subscribe(() => this.onScroll());
  }

  ngOnInit() {
  }

  private onScroll() {

  }

  onPokemonSelectedId(idPokemon: number) {
    this.idPokemonSelected = idPokemon;
  }
}
