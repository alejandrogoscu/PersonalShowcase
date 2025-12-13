import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();

  /**
   * Emit event when user clicks "Add to Cart"
   */
  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }

  /**
   * Get category label in Spanish
   */
  getCategoryLabel(): string {
    const labels: Record<string, string> = {
      technical: 'Técnico',
      learning: 'Crecimiento',
      teamwork: 'Colaboración',
    };
    return labels[this.product.category] || this.product.category;
  }

  /**
   * Get category color for badge
   */
  getCategoryColor(): string {
    const colors: Record<string, string> = {
      technical: '#2563eb',
      learning: '#10b981',
      teamwork: '#f59e0b',
    };
    return colors[this.product.category] || '#6b7280';
  }
}
