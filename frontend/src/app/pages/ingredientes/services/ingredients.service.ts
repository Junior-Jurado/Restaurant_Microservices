import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Ingredient } from '../interfaces/ingredient.interface';

@Injectable({
  providedIn: 'root',
})
export class IngredientsService {
  private apiUrl = 'http://18.117.240.16/api/v1/ingredient';

  constructor(private http: HttpClient) {}

  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.apiUrl);
  }
}
