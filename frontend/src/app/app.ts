import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ProductService } from './services/product.service';
import { Product } from './models/product.interface';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  error: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    console.log('🚀 Probando ProductService...');

    this.productService.getProducts().subscribe({
      next: (data) => {
        console.log('✅ Productos recibidos:', data);
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error al obtener productos:', err);
        this.error = err.message;
        this.loading = false;
      },
      complete: () => {
        console.log('✅ Petición completada');
      },
    });
  }
}
