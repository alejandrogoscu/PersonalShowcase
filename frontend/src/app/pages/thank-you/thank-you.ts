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
    // Get selected skills from cart before clearing
    const cartItems = this.cartService.getCartItems();

    if (cartItems.length === 0) {
      // Redirect to home if cart is empty (direct access to thank-you page)
      this.router.navigate(['/']);
      return;
    }

    // Extract selected product names for recap display
    this.selectedSkills = cartItems.map((item) => item.product.name);

    // Clear cart after showing confirmation
    // In real app, this would happen after successful payment/order creation
    this.cartService.clearCart();
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
}
