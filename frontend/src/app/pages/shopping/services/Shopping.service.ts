import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Shopping } from '../interfaces/shopping.interface';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  private apiUrl = 'http://18.117.240.16/api/v1/ingredient/shopping';
  constructor(private http: HttpClient) {}

  getShopping(): Observable<Shopping[]> {
    return this.http.get<Shopping[]>(this.apiUrl);
  }
}
