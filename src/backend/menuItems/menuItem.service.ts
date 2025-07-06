import { prisma } from "@/lib/db";
import {
    MenuItem,
    MenuItemServiceInterface
} from "@/types/menuItems";
import {
    CreateMenuItemRequest,
    UpdateMenuItemRequest
} from "@/backend/validations/schemas/menu-items";

export const MenuItemService: MenuItemServiceInterface = {
    async getAll(): Promise<MenuItem[]> {
        return prisma.menuItem.findMany({
            include: { 
                product: true, 
                category: true 
            },
            orderBy: [{ category: { name: "asc" } }, { name: "asc" }],
        });
    },

    async getById(id: string): Promise<MenuItem | null> {
        return prisma.menuItem.findUnique({
            where: { id },
            include: { 
                product: true, 
                category: true 
            },
        });
    },

    async create(data: CreateMenuItemRequest): Promise<MenuItem> {
        return prisma.menuItem.create({
            data: {
                ...data,
                name: data.name.trim(),
                description: data.description.trim(),
                productId: data.productId || null,
                categoryId: data.categoryId || null,
            },
            include: { 
                product: true, 
                category: true 
            },
        });
    },

    async update(id: string, data: UpdateMenuItemRequest): Promise<MenuItem> {
        return prisma.menuItem.update({
            where: { id },
            data: {
                ...data,
                name: data.name?.trim(),
                description: data.description?.trim(),
                productId: data.productId || null,
                categoryId: data.categoryId || null,
            },
            include: { 
                product: true, 
                category: true 
            },
        });
    },

    async delete(id: string): Promise<void> {
        await prisma.menuItem.delete({ where: { id } });
    },
};
