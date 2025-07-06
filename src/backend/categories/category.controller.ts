import { NextRequest, NextResponse } from "next/server";
import { CategoryService } from "./category.service";
import { 
    CategoryApiResponse 
} from "@/types/categories";
import { 
    CreateCategoryRequest, 
    UpdateCategoryRequest,
    createCategorySchema,
    updateCategorySchema
} from "@/backend/validations/schemas/categories";
import { validateRequest } from "@/backend/validations/utils";

export async function getAllCategories(): Promise<NextResponse> {
    try {
        const categories = await CategoryService.getAll();
        return NextResponse.json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
    }
}

export async function getCategoryById(id: string): Promise<NextResponse> {
    try {
        const category = await CategoryService.getById(id);
        if (!category) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }
        return NextResponse.json(category);
    } catch (error) {
        console.error("Error fetching category:", error);
        return NextResponse.json({ error: "Failed to fetch category" }, { status: 500 });
    }
}

export async function createCategory(request: NextRequest): Promise<NextResponse> {
    try {
        const body = await request.json();
        const validation = validateRequest(createCategorySchema, body);
        
        if (!validation.success) {
            return validation.error;
        }

        const existing = await CategoryService.findByName(validation.data.name);
        if (existing) {
            return NextResponse.json({ error: "Category with this name already exists" }, { status: 409 });
        }

        const category = await CategoryService.create(validation.data.name);
        return NextResponse.json(category, { status: 201 });
    } catch (error) {
        console.error("Error creating category:", error);
        return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
    }
}

export async function updateCategory(request: NextRequest, id: string): Promise<NextResponse> {
    try {
        const body = await request.json();
        const validation = validateRequest(updateCategorySchema, body);
        
        if (!validation.success) {
            return validation.error;
        }

        const existing = await CategoryService.getById(id);
        if (!existing) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        if (!validation.data.name) {
            return NextResponse.json({ error: "Category name is required" }, { status: 400 });
        }

        const duplicate = await CategoryService.findDuplicateByName(validation.data.name, id);
        if (duplicate) {
            return NextResponse.json({ error: "Category with this name already exists" }, { status: 409 });
        }

        const updated = await CategoryService.update(id, validation.data.name);
        return NextResponse.json(updated);
    } catch (error) {
        console.error("Error updating category:", error);
        return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
    }
}

export async function deleteCategory(id: string): Promise<NextResponse> {
    try {
        const category = await CategoryService.getById(id);

        if (!category) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        if (category.products && category.products.length > 0 || 
            category.menuItems && category.menuItems.length > 0) {
            return NextResponse.json(
                {
                    error: "Cannot delete category with associated products or menu items. Please remove or reassign them first.",
                },
                { status: 400 }
            );
        }

        await CategoryService.delete(id);
        return NextResponse.json({ message: "Category deleted successfully" });
    } catch (error) {
        console.error("Error deleting category:", error);
        return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
    }
}
