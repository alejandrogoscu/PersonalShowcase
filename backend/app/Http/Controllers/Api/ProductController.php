<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of active products ordered by display_order.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $products = Product::active()
            ->ordered()
            ->get();

        return response()->json(
            ProductResource::collection($products)->resolve()
        );
    }

    /**
     * Display the specified product by slug.
     *
     * @param  string  $slug
     * @return ProductResource
     */
    public function show(string $slug)
    {
        $product = Product::where('slug', $slug)
            ->where('active', true)
            ->firstOrFail();

        return new ProductResource($product);
    }

    /**
     * Display products filtered by category.
     *
     * @param  string  $category
     * @return \Illuminate\Http\JsonResponse
     */
    public function byCategory(string $category)
    {
        $products = Product::active()
            ->byCategory($category)
            ->ordered()
            ->get();

        return response()->json(
            ProductResource::collection($products)->resolve()
        );
    }
}
