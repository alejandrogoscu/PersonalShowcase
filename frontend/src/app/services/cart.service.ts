import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem } from '../models/cart-item.interface';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);

  // Observable público para que los componentes se suscriban
  public cartItems$: Observable<CartItem[]> = this.cartItemsSubject.asObservable();

  // Observable para el contador del carrito
  public cartCount$: Observable<number> = this.cartItems$.pipe(
    map((items) => items.reduce((total, item) => total + item.quantity, 0))
  );

  constructor() {
    // Cargar carrito desde localStorage al iniciar
    this.loadCartFromStorage();
  }

  /**
   * Get current cart items (snapshot)
   */
  getCartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  /**
   * Add product to cart or increment quantity if already exists
   */
  addToCart(product: Product): void {
    const currentCart = this.getCartItems();
    const existingItemIndex = currentCart.findIndex((item) => item.product.id === product.id);

    if (existingItemIndex !== -1) {
      // Product already in cart, increment quantity
      currentCart[existingItemIndex].quantity += 1;
    } else {
      // New product, add to cart
      currentCart.push({ product, quantity: 1 });
    }

    this.updateCart(currentCart);
  }

  /**
   * Remove product from cart
   */
  removeFromCart(productId: number): void {
    const currentCart = this.getCartItems();
    const updatedCart = currentCart.filter((item) => item.product.id !== productId);
    this.updateCart(updatedCart);
  }

  /**
   * Update quantity of a specific product
   */
  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const currentCart = this.getCartItems();
    const itemIndex = currentCart.findIndex((item) => item.product.id === productId);

    if (itemIndex !== -1) {
      currentCart[itemIndex].quantity = quantity;
      this.updateCart(currentCart);
    }
  }

  /**
   * Clear entire cart
   */
  clearCart(): void {
    this.updateCart([]);
  }

  /**
   * Get total items count
   */
  getTotalCount(): number {
    return this.getCartItems().reduce((total, item) => total + item.quantity, 0);
  }

  /**
   * Update cart and persist to localStorage
   */
  private updateCart(cart: CartItem[]): void {
    this.cartItemsSubject.next(cart);
    this.saveCartToStorage(cart);
  }

  /**
   * Save cart to localStorage
   */
  private saveCartToStorage(cart: CartItem[]): void {
    localStorage.setItem('personal_showcase_cart', JSON.stringify(cart));
  }

  /**
   * Load cart from localStorage
   */
  private loadCartFromStorage(): void {
    const savedCart = localStorage.getItem('personal_showcase_cart');
    if (savedCart) {
      try {
        const cart = JSON.parse(savedCart);
        this.cartItemsSubject.next(cart);
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        this.cartItemsSubject.next([]);
      }
    }
  }
}
