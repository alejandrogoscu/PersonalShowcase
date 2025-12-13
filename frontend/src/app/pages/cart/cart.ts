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

  incrementQuantity(productId: number, currentQuantity: number): void {
    this.cartService.updateQuantity(productId, currentQuantity + 1);
  }

  decrementQuantity(productId: number, currentQuantity: number): void {
    if (currentQuantity > 1) {
      this.cartService.updateQuantity(productId, currentQuantity - 1);
    } else {
      this.removeItem(productId);
    }
  }

  removeItem(productId: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este producto del carrito?')) {
      this.cartService.removeFromCart(productId);
    }
  }

  clearCart(): void {
    if (confirm('¿Estás seguro de que quieres vaciar todo el carrito?')) {
      this.cartService.clearCart();
    }
  }

  proceedToCheckout(): void {
    this.router.navigate(['/thank-you']);
  }

  continueShopping(): void {
    this.router.navigate(['/']);
  }

  getCategoryLabel(category: string): string {
    const labels: Record<string, string> = {
      technical: 'Técnica',
      learning: 'Crecimiento',
      teamwork: 'Colaboración',
    };
    return labels[category] || category;
  }

  getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
      technical: '#e43d47', // eciglogistica red (primary)
      learning: '#3b82f6', // blue (learning/growth)
      teamwork: '#10b981', // green (collaboration/success)
    };
    return colors[category] || '#6b7280';
  }
}
