import { ProductService } from "./product.service";
import { NextRequest, NextResponse } from "next/server";

export async function getAllProducts() {
    try {
        const products = await ProductService.getAll();
        return NextResponse.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}

export async function getProductById(id: string) {
    try {
        const product = await ProductService.getById(id);
        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }
        return NextResponse.json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
    }
}

export async function createProduct(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, description, imageUrl} = body;

        if (!title || !description || !imageUrl) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const product = await ProductService.create(body);
        return NextResponse.json(product, { status: 201});
    } catch (error) {
        return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
    }
}

export async function updateProduct(request: NextRequest, id: string) {
    try {
        const body = await request.json();
        const existing = await ProductService.getById(id);

        if (!existing) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        const updated = await ProductService.update(id, body);
        return NextResponse.json(updated);
    } catch (error) {
        console.error("Error updating product:", error);
        return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
    }
}

export async function deleteProduct(id: string) {
    try {
        const existing = await ProductService.getById(id);
        if (!existing) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        await ProductService.delete(id);
        return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting product:", error);
        return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
    }
}