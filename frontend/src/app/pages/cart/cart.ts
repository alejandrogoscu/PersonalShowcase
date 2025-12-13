import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartItem } from '../../models/cart-item.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class CartComponent implements OnInit {
  cartItems$!: Observable<CartItem[]>;
  cartCount$!: Observable<number>;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartItems$ = this.cartService.cartItems$;
    this.cartCount$ = this.cartService.cartCount$;
  }

  /**
   * Increment product quantity
   */
  incrementQuantity(productId: number, currentQuantity: number): void {
    this.cartService.updateQuantity(productId, currentQuantity + 1);
  }

  /**
   * Decrement product quantity
   */
  decrementQuantity(productId: number, currentQuantity: number): void {
    if (currentQuantity > 1) {
      this.cartService.updateQuantity(productId, currentQuantity - 1);
    } else {
      this.removeItem(productId);
    }
  }

  /**
   * Remove item from cart
   */
  removeItem(productId: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este producto del carrito?')) {
      this.cartService.removeFromCart(productId);
    }
  }

  /**
   * Clear entire cart
   */
  clearCart(): void {
    if (confirm('¿Estás seguro de que quieres vaciar todo el carrito?')) {
      this.cartService.clearCart();
    }
  }

  /**
   * Navigate to thank you page (simulating checkout)
   */
  proceedToCheckout(): void {
    this.router.navigate(['/thank-you']);
  }

  /**
   * Navigate back to home
   */
  continueShopping(): void {
    this.router.navigate(['/']);
  }

  /**
   * Get category label in Spanish
   */
  getCategoryLabel(category: string): string {
    const labels: Record<string, string> = {
      technical: 'Técnico',
      learning: 'Crecimiento',
      teamwork: 'Colaboración',
    };
    return labels[category] || category;
  }

  /**
   * Get category color for badge
   */
  getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
      technical: '#2563eb',
      learning: '#10b981',
      teamwork: '#f59e0b',
    };
    return colors[category] || '#6b7280';
  }
}
