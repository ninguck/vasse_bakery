import { NextRequest } from "next/server";
import { getAllCategories, createCategory } from "@/backend/categories/category.controller";

export async function GET() {
    return getAllCategories();
}

export async function POST(request: NextRequest) {
    return createCategory(request);
}
