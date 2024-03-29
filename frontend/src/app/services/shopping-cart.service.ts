import { Injectable } from '@angular/core';
import { Ingredient } from '../pages/ingredientes/interfaces/ingredient.interface';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShoppingCartService {
  ingredients: Ingredient[] = [];

  private cartSubject = new Subject<Ingredient[]>();
  private totalSubject = new Subject<number>();
  private quantitySubject = new Subject<number>();

  get totalAction$(): Observable<number> {
    return this.totalSubject.asObservable();
  }

  get quantityAction$(): Observable<number> {
    return this.quantitySubject.asObservable();
  }
  get cartAction$(): Observable<number> {
    return this.quantitySubject.asObservable();
  }
}
