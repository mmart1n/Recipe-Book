import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Ingredient } from '../ingredient.model';


@Component({
  selector: 'app-generic-ingredients-rows',
  templateUrl: './generic-ingredients-rows.component.html',
  styleUrls: ['./generic-ingredients-rows.component.css'],
})
export class GenericIngredientsRowsComponent {

  @Input() ingredients: Ingredient[];
  @Output() selectedIngredient = new EventEmitter<number>();

  getIngredientIndex(index: number) {
    this.selectedIngredient.emit(index);
  }

  constructor() { }

}
