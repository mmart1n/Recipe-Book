import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import { Ingredient } from './ingredient.model';


@Injectable()
export class DataStorageService {

  constructor(private httpClient: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

  storeRecipes() {
    //const headers = new HttpHeaders().set('Authorization', 'Bearer asdasdagfasfa');
    // return this.httpClient.put('https://recipe-angular-book.firebaseio.com/recipes.json',
    //   this.recipeService.getRecipes(), {
    //     observe: 'body',
    //     params: new HttpParams().set('auth', token) //ili gi pishem tuk ili hardcode
    //     //headers: headers
    //   });
    const request = new HttpRequest('PUT', 'https://recipe-angular-book.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(), {
        reportProgress: true,
      });
      return this.httpClient.request(request);
  }

  getRecipes() {
    //this.httpClient.get<Recipe[]>('https://recipe-angular-book.firebaseio.com/recipes.json?auth=' + token)
    this.httpClient.get<Recipe[]>('https://recipe-angular-book.firebaseio.com/recipes.json', {
      observe: 'body',
      responseType: 'json'
    }).pipe(map(
      (recipes) => {
        for (let recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          } else {
            let newIngredients: Ingredient[] = [];
            for (let ingredient of recipe.ingredients) {
              newIngredients.push(new Ingredient(ingredient.name, ingredient.amount));
            }
            recipe.ingredients = newIngredients;
          }
        }
        return recipes;
      }
    )).subscribe(
      (recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      }
    );
  }

}
