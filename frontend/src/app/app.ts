import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { HeaderComponent } from './components/header/header';
import { CartService } from './services/cart.service';
import { Product } from './models/product.interface';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent implements OnInit {
  cartCount$!: Observable<number>;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartCount$ = this.cartService.cartCount$;
  }

  // Método de prueba para agregar producto dummy
  testAddToCart(): void {
    const dummyProduct: Product = {
      id: 99,
      name: 'Producto de Prueba',
      slug: 'producto-prueba',
      shortDescription: 'Este es un producto de prueba',
      description: 'Descripción completa del producto de prueba',
      category: 'technical',
      priceLabel: 'Gratis',
      imageUrl: null,
      features: ['Feature 1', 'Feature 2'],
      technicalSkills: null,
      displayOrder: 1,
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.cartService.addToCart(dummyProduct);
    console.log('✅ Producto agregado al carrito');
  }

  // Método de prueba para limpiar carrito
  testClearCart(): void {
    this.cartService.clearCart();
    console.log('🗑️ Carrito limpiado');
  }
}
