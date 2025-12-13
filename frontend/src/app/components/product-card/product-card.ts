import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.interface';

/**
 * ProductCardComponent
 */
@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();

  // Controls visibility of collapsible technical skills section
  isSkillsExpanded = false;

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }

  toggleSkills(): void {
    this.isSkillsExpanded = !this.isSkillsExpanded;
  }

  /**
   * Get category label in Spanish
   */
  getCategoryLabel(): string {
    const labels: Record<string, string> = {
      technical: 'Técnico',
      learning: 'Aprendizaje',
      teamwork: 'Colaboración',
    };
    return labels[this.product.category] || this.product.category;
  }

  /**
   * Get category color for badge
   */
  getCategoryColor(): string {
    const colors: Record<string, string> = {
      technical: '#e43d47', // eciglogistica red (primary)
      learning: '#3b82f6', // blue (learning/growth)
      teamwork: '#10b981', // green (collaboration/success)
    };
    return colors[this.product.category] || '#6b7280';
  }
}
