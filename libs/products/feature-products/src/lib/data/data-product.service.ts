import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '@wireless/shared/utils';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/product');
  }
}
