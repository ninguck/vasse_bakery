import { prisma } from "@/lib/db";

export const MenuItemService = {
    async getAll() {
        return prisma.menuItem.findMany({
        include: { product: true, category: true },
        orderBy: [{ category: { name: "asc" } }, { name: "asc" }],
        });
    },

    async getById(id: string) {
        return prisma.menuItem.findUnique({
        where: { id },
        include: { product: true, category: true },
        });
    },

    async create(data: {
        name: string;
        description: string;
        price: number;
        productId?: string | null;
        categoryId?: string | null;
    }) {
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

    async update(id: string, data: {
        name: string;
        description: string;
        price: number;
        productId?: string | null;
        categoryId?: string | null;
    }) {
        return prisma.menuItem.update({
        where: { id },
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

    async delete(id: string) {
        return prisma.menuItem.delete({ where: { id } });
    }
};
