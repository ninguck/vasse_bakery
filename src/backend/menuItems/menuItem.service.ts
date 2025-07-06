import { prisma } from "@/lib/db";
import {
    MenuItem,
    CreateMenuItemRequest,
    UpdateMenuItemRequest,
    MenuItemServiceInterface
} from "@/types/menuItems";

export const MenuItemService: MenuItemServiceInterface = {
    async getAll(): Promise<MenuItem[]> {
        return prisma.menuItem.findMany({
            include: { product: true, category: true },
            orderBy: [{ category: { name: "asc" } }, { name: "asc" }],
        });
    },

    async getById(id: string): Promise<MenuItem | null> {
        return prisma.menuItem.findUnique({
            where: { id },
            include: { product: true, category: true },
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
            include: { product: true, category: true },
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
            include: { product: true, category: true },
        });
    },

    async delete(id: string): Promise<void> {
        await prisma.menuItem.delete({ where: { id } });
    },
};
