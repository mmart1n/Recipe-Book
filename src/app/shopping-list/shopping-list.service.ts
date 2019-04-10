import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {

  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  parsedIngredients = new Subject<Ingredient[]>();

  private zutaten: Map<string, Ingredient> = new Map<string, Ingredient>([
    ['Apples', new Ingredient('Apples', 5)],
    ['Tomatoes', new Ingredient('Tomatoes', 10)]
  ]);

  private zutatenList: Ingredient[];

  getIngredients() {
    this.zutatenList = [];
    Array.from(this.zutaten.values()).sort((a, b) => a.name > b.name ? 1 : -1).forEach(value => this.zutatenList.push(value));
    return this.zutatenList.slice();
  }

  getIngredient(index: number) {
    return this.zutatenList[index];
  }

  addIngredient(ingredient: Ingredient) {
    if (this.zutaten.has(ingredient.name.trim())) {
      this.zutaten.get(ingredient.name.trim()).amount += ingredient.amount;
    } else {
      this.zutaten.set(ingredient.name.trim(), ingredient);
    }
    this.ingredientsChanged.next(this.getIngredients());
  }

  addIngredients(ingredients: Ingredient[]) {
    const ingredientsCopy: Ingredient[] = ingredients.map(item => item.clone());
    for (const ingredient of ingredientsCopy) {
      if (this.zutaten.has(ingredient.name.trim())) {
        this.zutaten.get(ingredient.name.trim()).amount += ingredient.amount;
      } else {
        this.zutaten.set(ingredient.name.trim(), ingredient);
      }
    }
    this.ingredientsChanged.next(this.getIngredients());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.zutaten.delete(this.zutatenList[index].name.trim());
    this.zutaten.set(newIngredient.name.trim(), newIngredient);
    this.ingredientsChanged.next(this.getIngredients());
  }

  deleteIngredient(index: number) {
    this.zutaten.delete(this.zutatenList[index].name.trim());
    this.ingredientsChanged.next(this.getIngredients());
  }

  parseIngredients(ingredients: Ingredient[]) {
    this.parsedIngredients.next(this.getIngredients());
  }

}
