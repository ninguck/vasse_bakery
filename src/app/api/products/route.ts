import { NextRequest } from "next/server";
import { getAllProducts, createProduct } from "@/backend/products/product.controller";

export async function GET(request: NextRequest) {
    return getAllProducts();
}

export async function POST(request: NextRequest) {
    return createProduct(request);
}