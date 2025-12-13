---
applyTo: '**'
---

# GITHUB COPILOT INSTRUCTIONS - E-COMMERCE PERSONAL SHOWCASE

## 📋 INFORMACIÓN DEL PROYECTO

### Contexto

Estoy construyendo un **e-commerce showcase creativo** para una entrevista de trabajo en **ecoglistica**. Los "productos" representan mis habilidades profesionales.

### Ruta del Proyecto

```
/Users/alejandrogoscu/Desktop/alejandroGoscu/001PersonalProjects/PersonalShowcase/
├── backend/   (Laravel 12.42.0)
└── frontend/  (Angular 21.0.1)
```

### Stack Tecnológico

- **Backend:** Laravel 12.42.0, API REST, Eloquent ORM, MySQL
- **Frontend:** Angular 21.0.1, TypeScript, RxJS, CSS puro (NO Tailwind)
- **Base de Datos:** MySQL (personal_showcase)

---

## 🎯 LOS 3 PRODUCTOS DEL E-COMMERCE

### Producto 1: "Full Stack Developer - Edición Experto"

```json
{
  "name": "Full Stack Developer - Edición Experto",
  "category": "technical",
  "short_description": "Developer con Stack Técnico Sólido",
  "price_label": "Experiencia demostrada + Pasión por la tecnología",
  "features": ["Código limpio y mantenible", "Arquitectura escalable", "Debugging eficiente", "Testing de calidad"],
  "technical_skills": ["JavaScript (ES6+)", "HTML5 & CSS3", "Git & GitHub", "RESTful APIs"]
}
```

### Producto 2: "Aprendizaje Continuo - Versión Pro"

```json
{
  "name": "Aprendizaje Continuo - Versión Pro",
  "category": "learning",
  "short_description": "Desarrollador Proactivo & Adaptable",
  "price_label": "Motivación infinita + Curiosidad insaciable",
  "features": [
    "Autoaprendizaje acelerado",
    "Investigación efectiva",
    "Resolución creativa de problemas",
    "Stack en expansión continua"
  ]
}
```

### Producto 3: "Colaborador Premium - Pack Completo"

```json
{
  "name": "Colaborador Premium - Pack Completo",
  "category": "teamwork",
  "short_description": "Team Player Apasionado",
  "price_label": "Dedicación total + Valores alineados con ecoglistica",
  "features": [
    "Colaboración efectiva",
    "Comunicación clara",
    "Compromiso con sostenibilidad",
    "Mentalidad de crecimiento"
  ]
}
```

---

## 🗄️ ESQUEMA DE BASE DE DATOS APROBADO

### Tabla: products

```sql
CREATE TABLE products (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    short_description VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    category ENUM('technical', 'learning', 'teamwork') NOT NULL,
    price_label VARCHAR(255) NOT NULL,
    image_url VARCHAR(500) NULL,
    features JSON NOT NULL,
    technical_skills JSON NULL,
    display_order TINYINT UNSIGNED NOT NULL DEFAULT 1,
    active BOOLEAN NOT NULL DEFAULT 1,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

### Tabla: orders (opcional)

```sql
CREATE TABLE orders (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    items JSON NOT NULL,
    total_label VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NULL,
    customer_name VARCHAR(255) NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

---

## 📐 PRINCIPIOS DE CÓDIGO A SEGUIR

### General

- ✅ Nombres descriptivos en inglés
- ✅ Funciones pequeñas (< 20 líneas idealmente)
- ✅ Comentarios que explican "por qué", no "qué"
- ✅ Principios SOLID y Clean Code
- ✅ DRY: no repetir código

### Laravel (Backend)

```php
// ✅ BUENO: Usar Eloquent, Resources, Scopes
class ProductController extends Controller {
    public function index() {
        return ProductResource::collection(
            Product::active()->ordered()->get()
        );
    }
}

// ✅ BUENO: Modelo con scopes y casts
class Product extends Model {
    protected $fillable = ['name', 'slug', ...];

    protected $casts = [
        'features' => 'array',
        'technical_skills' => 'array',
        'active' => 'boolean'
    ];

    public function scopeActive($query) {
        return $query->where('active', true);
    }
}

// ❌ MALO: Lógica en controlador, DB crudo
class ProductController extends Controller {
    public function index() {
        return DB::table('products')->get();
    }
}
```

### Angular (Frontend)

```typescript
// ✅ BUENO: Servicios, inyección de dependencias, observables
@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }
}

// ✅ BUENO: Componente usando servicios
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
  }
}

// ❌ MALO: Fetch directo en componente
export class ProductListComponent {
  products: Product[] = [];

  ngOnInit() {
    fetch('http://localhost:8000/api/products')
      .then((res) => res.json())
      .then((data) => (this.products = data));
  }
}
```

### CSS

```css
/* ✅ BUENO: CSS puro, variables, Grid/Flexbox */
:root {
  --primary-color: #2563eb;
  --spacing-md: 1rem;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-md);
}

/* ❌ MALO: No usar Tailwind u otros frameworks */
```

---

## 🛠️ COMANDOS LARAVEL ARTISAN A USAR

### Migraciones

```bash
# Crear migración
php artisan make:migration create_products_table

# Ejecutar migraciones
php artisan migrate

# Limpiar y volver a ejecutar
php artisan migrate:fresh
```

### Modelos

```bash
# Crear modelo con migración
php artisan make:model Product -m

# Crear modelo con todo
php artisan make:model Product -mcr
```

### Controladores

```bash
# Controlador API
php artisan make:controller Api/ProductController --api

# Controlador resource completo
php artisan make:controller ProductController --resource
```

### Resources (Transformers)

```bash
php artisan make:resource ProductResource
php artisan make:resource ProductCollection
```

### Seeders

```bash
# Crear seeder
php artisan make:seeder ProductSeeder

# Ejecutar seeders
php artisan db:seed
php artisan db:seed --class=ProductSeeder
```

### Otros útiles

```bash
# Ver rutas
php artisan route:list

# Cache clear
php artisan cache:clear
php artisan config:clear

# Iniciar servidor
php artisan serve
```

---

## 🅰️ COMANDOS ANGULAR CLI A USAR

### Componentes

```bash
# Componente standalone
ng generate component components/product-card

# Componente con routing
ng generate component pages/landing --routing
```

### Servicios

```bash
ng generate service services/product
ng generate service services/cart
```

### Interfaces/Models

```bash
ng generate interface models/product
ng generate interface models/cart-item
```

### Módulos (si no usas standalone)

```bash
ng generate module cart --routing
```

### Otros útiles

```bash
# Iniciar servidor de desarrollo
ng serve

# Build de producción
ng build --configuration production

# Generar guard
ng generate guard guards/auth
```

---

## 📂 ESTRUCTURA DE ARCHIVOS ESPERADA

### Backend (Laravel)

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── Api/
│   │   │       └── ProductController.php
│   │   └── Resources/
│   │       └── ProductResource.php
│   ├── Models/
│   │   └── Product.php
│   └── ...
├── database/
│   ├── migrations/
│   │   └── 2024_xx_xx_create_products_table.php
│   └── seeders/
│       └── ProductSeeder.php
├── routes/
│   └── api.php
└── config/
    └── cors.php
```

### Frontend (Angular)

```
frontend/src/app/
├── models/
│   ├── product.interface.ts
│   └── cart-item.interface.ts
├── services/
│   ├── product.service.ts
│   └── cart.service.ts
├── components/
│   ├── header/
│   ├── product-card/
│   └── ...
├── pages/
│   ├── landing/
│   ├── cart/
│   └── thank-you/
├── app.routes.ts
└── app.config.ts
```

---

## 🔄 CONFIGURACIÓN DE CORS (Laravel)

```php
// config/cors.php
return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:4200'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
```

---

## 🌐 CONFIGURACIÓN DE ENVIRONMENTS (Angular)

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api',
};

// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.production.com/api',
};
```

---

## 🎨 GUÍA DE DISEÑO UI/UX

### Colores Sugeridos

```css
:root {
  /* Colores principales */
  --primary: #2563eb; /* Azul profesional */
  --secondary: #10b981; /* Verde (ecoglistica) */
  --accent: #f59e0b; /* Naranja/Amarillo */

  /* Neutros */
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-800: #1f2937;
  --gray-900: #111827;

  /* Estados */
  --success: #10b981;
  --error: #ef4444;
  --warning: #f59e0b;
}
```

### Tipografía

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
}

h1 {
  font-size: 2.5rem;
  font-weight: 700;
}
h2 {
  font-size: 2rem;
  font-weight: 600;
}
h3 {
  font-size: 1.5rem;
  font-weight: 600;
}
```

### Espaciado

```css
:root {
  --spacing-xs: 0.25rem; /* 4px */
  --spacing-sm: 0.5rem; /* 8px */
  --spacing-md: 1rem; /* 16px */
  --spacing-lg: 1.5rem; /* 24px */
  --spacing-xl: 2rem; /* 32px */
  --spacing-2xl: 3rem; /* 48px */
}
```

---

## 📝 CONVENCIÓN DE COMMITS

```
feat(backend): add Product model and migration
feat(frontend): create product list component
fix(api): resolve CORS configuration issue
refactor(service): improve cart state management
style(ui): adjust product card responsive layout
docs(readme): add installation instructions
chore(deps): update Angular to v21
```

**Tipos:**

- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `refactor`: Refactorización de código
- `style`: Cambios de estilo (CSS, formato)
- `docs`: Documentación
- `test`: Tests
- `chore`: Tareas de mantenimiento

---

## 🚀 FLUJO DE DESARROLLO RECOMENDADO

### Fase 1: Backend API

1. Crear migración de products
2. Crear modelo Product con casts y scopes
3. Crear ProductSeeder con los 3 productos
4. Crear ProductResource para transformación
5. Crear ProductController con index() y show()
6. Configurar rutas en api.php
7. Configurar CORS
8. Probar endpoints con Postman/Thunder Client

### Fase 2: Frontend Base

1. Crear interfaces (Product, CartItem)
2. Crear ProductService con HttpClient
3. Crear CartService con BehaviorSubject
4. Configurar environments

### Fase 3: Componentes UI

1. HeaderComponent (con contador carrito)
2. ProductCardComponent
3. ProductListComponent (landing page)
4. CartComponent
5. ThankYouComponent

### Fase 4: Routing y Navegación

1. Configurar app.routes.ts
2. Implementar navegación entre páginas

### Fase 5: Estilos y Responsive

1. Estilos globales
2. CSS Grid para product grid
3. Responsive design (mobile-first)
4. Animaciones sutiles

### Fase 6: Testing e Integración

1. Probar flujo completo
2. Ajustes de UX
3. Optimización

---

## 💡 TIPS PARA USAR CON GITHUB COPILOT

### En VSCode:

1. **Usa comentarios descriptivos antes de escribir código:**

   ```typescript
   // Create a service to manage products from the Laravel API
   // It should use HttpClient and return Observables
   ```

2. **Describe la función que necesitas:**

   ```typescript
   // Function to add a product to the cart
   // It should check if product already exists and increment quantity
   ```

3. **Pide ejemplos específicos:**

   ```typescript
   // Generate a ProductCard component that displays:
   // - Product name and description
   // - Features list
   // - Price label
   // - Add to cart button
   ```

4. **Usa Copilot Chat para preguntas:**
   - "How do I configure CORS in Laravel for Angular?"
   - "Show me how to create a BehaviorSubject for cart state"
   - "Generate a migration for the products table with this schema: [paste schema]"

---

## ⚠️ RESTRICCIONES IMPORTANTES

### NO USAR:

- ❌ Tailwind CSS (usar CSS puro)
- ❌ Bootstrap (usar CSS puro)
- ❌ localStorage en artifacts (pero SÍ en proyecto local)
- ❌ jQuery
- ❌ Consultas SQL crudas (usar Eloquent)

### SÍ USAR:

- ✅ CSS Grid y Flexbox
- ✅ CSS Variables
- ✅ Eloquent ORM
- ✅ RxJS Observables
- ✅ TypeScript strict mode
- ✅ Async/Await cuando sea apropiado

---

## 📧 DATOS DE CONTACTO PARA LA APP

```typescript
// Para la página de confirmación
const CONTACT_INFO = {
  email: 'tu_email@ejemplo.com', // ← Cambiar por tu email real
  linkedin: 'linkedin.com/in/tu-perfil', // ← Cambiar por tu LinkedIn
  github: 'github.com/tu-usuario', // ← Opcional
};
```

---

## ✅ CHECKLIST DE FUNCIONALIDADES

### Backend

- [ ] Migración de products creada y ejecutada
- [ ] Modelo Product con casts y scopes
- [ ] ProductSeeder con 3 productos
- [ ] ProductResource para transformación
- [ ] ProductController con index() y show()
- [ ] Rutas API configuradas
- [ ] CORS configurado para Angular
- [ ] Endpoints probados y funcionando

### Frontend

- [ ] Interfaces Product y CartItem
- [ ] ProductService con HttpClient
- [ ] CartService con gestión de estado
- [ ] HeaderComponent con contador
- [ ] ProductCardComponent
- [ ] Landing page con grid de productos
- [ ] CartComponent con lista y eliminar
- [ ] ThankYouComponent con call-to-action
- [ ] Routing configurado
- [ ] Estilos CSS responsive
- [ ] Integración backend-frontend funcionando

### Extra

- [ ] README.md completo
- [ ] Código comentado
- [ ] Commits con mensajes descriptivos
- [ ] Proyecto probado end-to-end

---

## 🎯 OBJETIVO FINAL

Crear un **e-commerce showcase funcional** que demuestre:

1. ✅ Habilidades técnicas (Laravel + Angular)
2. ✅ Creatividad (concepto de vender habilidades como productos)
3. ✅ Código limpio y buenas prácticas
4. ✅ Arquitectura profesional (API REST, componentes, servicios)
5. ✅ Diseño responsive y moderno
6. ✅ Capacidad de completar un proyecto full-stack

**Duración estimada:** 4-6 horas de desarrollo

**Para presentar en entrevista en ecoglistica** 🚀
