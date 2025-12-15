#!/bin/bash

echo "======================================"
echo "🚀 Railway Initialization Script"
echo "======================================"

# Limpiar cachés
echo "🧹 Clearing caches..."
php artisan config:clear
php artisan cache:clear
php artisan route:clear

# Ejecutar migraciones
echo "📦 Running migrations..."
php artisan migrate --force

# Verificar si existen productos
PRODUCT_COUNT=$(php artisan tinker --execute="echo App\\Models\\Product::count();")
echo "📊 Current products in database: $PRODUCT_COUNT"

# Si no hay productos, ejecutar seeder
if [ "$PRODUCT_COUNT" -eq "0" ]; then
    echo "🌱 No products found. Running seeder..."
    php artisan db:seed --class=ProductSeeder --force

    # Verificar que se crearon
    NEW_COUNT=$(php artisan tinker --execute="echo App\\Models\\Product::count();")
    echo "✅ Products after seeding: $NEW_COUNT"
else
    echo "ℹ️  Products already exist. Skipping seeder."
fi

# Iniciar servidor
echo "🚀 Starting Laravel server..."
php artisan serve --host=0.0.0.0 --port=$PORT
