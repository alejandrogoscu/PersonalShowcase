import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ProductCardComponent } from '../../components/product-card/product-card';

@Component({
  selector: 'app-landing',
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class LandingComponent implements OnInit {
  products$!: Observable<Product[]>;
  loading = true;
  error: string | null = null;

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  /**
   * Load products from API
   */
  loadProducts(): void {
    this.loading = true;
    this.error = null;

    this.productService.getProducts().subscribe({
      next: (products) => {
        this.loading = false;
        console.log('✅ Products loaded:', products);
      },
      error: (err) => {
        this.loading = false;
        this.error = 'No se pudieron cargar los productos. Por favor, intenta de nuevo.';
        console.error('❌ Error loading products:', err);
      },
    });

    // Assign observable for async pipe
    this.products$ = this.productService.getProducts();
  }

  /**
   * Handle add to cart event from ProductCard
   */
  onAddToCart(product: Product): void {
    this.cartService.addToCart(product);
    console.log('✅ Producto agregado al carrito:', product.name);

    // Optional: Show toast notification
    this.showNotification(`"${product.name}" agregado al carrito`);
  }

  /**
   * Show temporary notification (simple implementation)
   */
  private showNotification(message: string): void {
    // TODO: Implement a proper toast/notification service
    alert(message);
  }
}
