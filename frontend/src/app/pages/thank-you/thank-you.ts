import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-thank-you',
  imports: [CommonModule],
  templateUrl: './thank-you.html',
  styleUrl: './thank-you.css',
})
export class ThankYouComponent implements OnInit {
  selectedSkills: string[] = [];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    // Get selected skills from cart
    const cartItems = this.cartService.getCartItems();

    if (cartItems.length === 0) {
      // If cart is empty, redirect to home
      this.router.navigate(['/']);
      return;
    }

    // Extract selected product names
    this.selectedSkills = cartItems.map((item) => item.product.name);

    // Clear cart after showing confirmation
    this.cartService.clearCart();
  }

  /**
   * Navigate back to home
   */
  goToHome(): void {
    this.router.navigate(['/']);
  }
}
