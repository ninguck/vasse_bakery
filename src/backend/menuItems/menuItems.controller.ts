import { NextRequest, NextResponse } from "next/server";
import { MenuItemService } from "./menuItem.service";
import { prisma } from "@/lib/db";
import {
    CreateMenuItemRequest,
    UpdateMenuItemRequest,
    MenuItemApiResponse
} from "@/types/menuItems";

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
        const body: CreateMenuItemRequest = await request.json();
        const { name, description, price, productId, categoryId } = body;

        if (!name || !description || price === undefined || price === null) {
            return NextResponse.json({ error: "Name, description, and price are required" }, { status: 400 });
        }

        if (typeof price !== "number" || price < 0) {
            return NextResponse.json({ error: "Price must be a positive number" }, { status: 400 });
        }

        if (!productId && !categoryId) {
            return NextResponse.json({ error: "Either productId or categoryId must be provided" }, { status: 400 });
        }

        if (productId) {
            const product = await prisma.product.findUnique({ where: { id: productId } });
            if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        if (categoryId) {
            const category = await prisma.category.findUnique({ where: { id: categoryId } });
            if (!category) return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        const menuItem = await MenuItemService.create({ name, description, price, productId, categoryId });
        return NextResponse.json(menuItem, { status: 201 });

    } catch (error) {
        console.error("Error creating menu item:", error);
        return NextResponse.json({ error: "Failed to create menu item" }, { status: 500 });
    }
}

export async function updateMenuItem(request: NextRequest, id: string): Promise<NextResponse> {
    try {
        const body: UpdateMenuItemRequest = await request.json();
        const { name, description, price, productId, categoryId } = body;

        const existing = await MenuItemService.getById(id);
        if (!existing) return NextResponse.json({ error: "Menu item not found" }, { status: 404 });

        if (!name || !description || price === undefined || price === null) {
            return NextResponse.json({ error: "Name, description, and price are required" }, { status: 400 });
        }

        if (typeof price !== "number" || price < 0) {
            return NextResponse.json({ error: "Price must be a positive number" }, { status: 400 });
        }

        if (!productId && !categoryId) {
            return NextResponse.json({ error: "Either productId or categoryId must be provided" }, { status: 400 });
        }

        if (productId) {
            const product = await prisma.product.findUnique({ where: { id: productId } });
            if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        if (categoryId) {
            const category = await prisma.category.findUnique({ where: { id: categoryId } });
            if (!category) return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        const updated = await MenuItemService.update(id, { name, description, price, productId, categoryId });
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
