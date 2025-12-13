import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Get all active products ordered by display_order
   */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  /**
   * Get a single product by slug
   */
  getProductBySlug(slug: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${slug}`);
  }

  /**
   * Get products filtered by category
   */
  getProductsByCategory(category: 'technical' | 'learning' | 'teamwork'): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/category/${category}`);
  }
}
