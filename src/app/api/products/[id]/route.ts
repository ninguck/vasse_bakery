import { NextRequest } from "next/server";
import { getProductById, updateProduct, deleteProduct } from "@/backend/products/product.controller";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
    return getProductById(params.id);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    return updateProduct(request, params.id);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    return deleteProduct(params.id);
}

