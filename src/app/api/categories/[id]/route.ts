import { NextRequest } from "next/server";
import {
    getCategoryById,
    updateCategory,
    deleteCategory,
    } from "@/backend/categories/category.controller";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
    return getCategoryById(params.id);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    return updateCategory(request, params.id);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    return deleteCategory(params.id);
}
