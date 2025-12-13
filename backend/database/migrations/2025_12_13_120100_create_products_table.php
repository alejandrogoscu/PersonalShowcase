<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('short_description', 500);
            $table->text('description');
            $table->enum('category', ['technical', 'learning', 'teamwork']);
            $table->string('price_label');
            $table->string('image_url', 500)->nullable();
            $table->json('features');
            $table->json('technical_skills')->nullable();
            $table->unsignedTinyInteger('display_order')->default(1);
            $table->boolean('active')->default(true);
            $table->timestamps();

            // Indexes for better performance
            $table->index('category');
            $table->index('active');
            $table->index('display_order');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
