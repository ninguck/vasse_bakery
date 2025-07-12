import { NextRequest, NextResponse } from "next/server";
import { MenuItemService } from "./menuItem.service";
import { prisma } from "@/lib/db";
import {
    MenuItemApiResponse
} from "@/types/menuItems";
import {
    CreateMenuItemRequest,
    UpdateMenuItemRequest,
    createMenuItemSchema,
    updateMenuItemSchema
} from "@/backend/validations/schemas/menu-items";
import { validateRequest } from "@/backend/validations/utils";

export async function getAllMenuItems(): Promise<NextResponse> {
    try {
        const menuItems = await MenuItemService.getAll();
        return NextResponse.json(menuItems);
    } catch (error) {
        console.error("Error fetching menu items:", error);
        return NextResponse.json({ error: "Failed to fetch menu items" }, { status: 500 });
    }
}

export async function getMenuItemById(id: string): Promise<NextResponse> {
    try {
        const menuItem = await MenuItemService.getById(id);
        if (!menuItem) {
            return NextResponse.json({ error: "Menu item not found" }, { status: 404 });
        }
        return NextResponse.json(menuItem);
    } catch (error) {
        console.error("Error fetching menu item:", error);
        return NextResponse.json({ error: "Failed to fetch menu item" }, { status: 500 });
    }
}

export async function createMenuItem(request: NextRequest): Promise<NextResponse> {
    try {
        const body = await request.json();
        const validation = validateRequest(createMenuItemSchema, body);
        
        if (!validation.success) {
            return validation.error;
        }

        // For creates, require at least one link
        if (!validation.data.productId && !validation.data.categoryId) {
            return NextResponse.json({ error: "Either productId or categoryId must be provided" }, { status: 400 });
        }

        // Prevent linking to both product and category
        if (validation.data.productId && validation.data.categoryId) {
            return NextResponse.json({ error: "Cannot link to both product and category" }, { status: 400 });
        }

        if (validation.data.productId) {
            const product = await prisma.product.findUnique({ where: { id: validation.data.productId } });
            if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        if (validation.data.categoryId) {
            const category = await prisma.category.findUnique({ where: { id: validation.data.categoryId } });
            if (!category) return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        const menuItem = await MenuItemService.create(validation.data);
        return NextResponse.json(menuItem, { status: 201 });

    } catch (error) {
        console.error("Error creating menu item:", error);
        return NextResponse.json({ error: "Failed to create menu item" }, { status: 500 });
    }
}

export async function updateMenuItem(request: NextRequest, id: string): Promise<NextResponse> {
    try {
        const body = await request.json();
        const validation = validateRequest(updateMenuItemSchema, body);
        
        if (!validation.success) {
            return validation.error;
        }

        const existing = await MenuItemService.getById(id);
        if (!existing) return NextResponse.json({ error: "Menu item not found" }, { status: 404 });

        // For updates, allow removing links (setting both to null)
        // Only validate if both are being set to non-null values
        if (validation.data.productId && validation.data.categoryId) {
            return NextResponse.json({ error: "Cannot link to both product and category" }, { status: 400 });
        }

        if (validation.data.productId) {
            const product = await prisma.product.findUnique({ where: { id: validation.data.productId } });
            if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        if (validation.data.categoryId) {
            const category = await prisma.category.findUnique({ where: { id: validation.data.categoryId } });
            if (!category) return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        const updated = await MenuItemService.update(id, validation.data);
        return NextResponse.json(updated);

    } catch (error) {
        console.error("Error updating menu item:", error);
        return NextResponse.json({ error: "Failed to update menu item" }, { status: 500 });
    }
}

export async function deleteMenuItem(id: string): Promise<NextResponse> {
    try {
        const existing = await MenuItemService.getById(id);
        if (!existing) return NextResponse.json({ error: "Menu item not found" }, { status: 404 });

        await MenuItemService.delete(id);
        return NextResponse.json({ message: "Menu item deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting menu item:", error);
        return NextResponse.json({ error: "Failed to delete menu item" }, { status: 500 });
    }
}
