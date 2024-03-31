import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Shopping } from '../interfaces/shopping.interface';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  private apiUrl = 'http://18.117.240.16/api/v1/ingredient/shopping';

  constructor(private http: HttpClient) {}

  getShopping(): Observable<Shopping[]> {
    return interval(1000).pipe(
      switchMap(() => this.http.get<Shopping[]>(this.apiUrl))
    );
  }
}
