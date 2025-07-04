import { NextRequest, NextResponse } from "next/server";
import { CategoryService } from "./category.service";

export async function getAllCategories() {
    try {
        const categories = await CategoryService.getAll();
        return NextResponse.json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
    }
}

export async function getCategoryById(id: string) {
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

export async function createCategory(request: NextRequest) {
    try {
        const { name } = await request.json();

        if (!name) {
        return NextResponse.json({ error: "Category name is required" }, { status: 400 });
        }

        const existing = await CategoryService.findByName(name);
        if (existing) {
        return NextResponse.json({ error: "Category with this name already exists" }, { status: 409 });
        }

        const category = await CategoryService.create(name);
        return NextResponse.json(category, { status: 201 });
    } catch (error) {
        console.error("Error creating category:", error);
        return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
    }
}

export async function updateCategory(request: NextRequest, id: string) {
    try {
        const { name } = await request.json();

        if (!name) {
        return NextResponse.json({ error: "Category name is required" }, { status: 400 });
        }

        const existing = await CategoryService.getById(id);
        if (!existing) {
        return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        const duplicate = await CategoryService.findDuplicateByName(name, id);
        if (duplicate) {
        return NextResponse.json({ error: "Category with this name already exists" }, { status: 409 });
        }

        const updated = await CategoryService.update(id, name);
        return NextResponse.json(updated);
    } catch (error) {
        console.error("Error updating category:", error);
        return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
    }
}

export async function deleteCategory(id: string) {
    try {
        const category = await CategoryService.getById(id);

        if (!category) {
        return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        if (category.products.length > 0 || category.menuItems.length > 0) {
        return NextResponse.json(
            {
            error:
                "Cannot delete category with associated products or menu items. Please remove or reassign them first.",
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
