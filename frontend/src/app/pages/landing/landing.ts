import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ProductCardComponent } from '../../components/product-card/product-card';

/**
 * LandingComponent
 *
 * Main landing page that displays the product catalog (professional skills).
 * Handles product loading, error states, and cart interactions.
 *
 * Features:
 * - Hero section with introduction
 * - Products grid with card components
 * - Loading and error states
 * - Call to action section
 * - Add to cart functionality
 */
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
   * Sets loading state and handles errors gracefully
   */
  loadProducts(): void {
    this.loading = true;
    this.error = null;

    this.productService.getProducts().subscribe({
      next: () => {
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.error = 'No se pudieron cargar los productos. Por favor, intenta de nuevo.';
        console.error('Error loading products:', err);
      },
    });

    // Assign observable for async pipe in template
    this.products$ = this.productService.getProducts();
  }

  /**
   * Handle add to cart event from ProductCard
   * Adds product to cart and shows confirmation
   *
   * @param product Product to add to cart
   */
  onAddToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.showNotification(`"${product.name}" agregado al carrito`);
  }

  /**
   * Show temporary notification (simple alert implementation)
   * TODO: Implement a proper toast/notification service for better UX
   *
   * @param message Notification message to display
   */
  private showNotification(message: string): void {
    alert(message);
  }
}
