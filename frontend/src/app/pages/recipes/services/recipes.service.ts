import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../interfaces/recipe.interface';
@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private apiUrl = 'http://18.117.240.16/api/v1/recipe';
  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiUrl);
  }
}
