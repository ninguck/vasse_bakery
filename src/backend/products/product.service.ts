import { prisma } from "@/lib/db";;

export const ProductService = {
    async getAll() {
        return prisma.product.findMany({
            include: {
                category: true,
                menuItems: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    },

    async getById(id: string) {
        return prisma.product.findUnique({
            where: { id },
            include: {
                category: true,
                menuItems: true,
            },
        });
    },

    async create(data: any) {
        return prisma.product.create({
            data: {
                ...data,
                categoryId: data.categoryId || null,
            },
            include: {
                category: true,
                menuItems: true,
            },
        });
    },

    async update(id: string, data: any) {
        return prisma.product.update({
            where: { id },
            data: {
                ...data,
                categoryId: data.categoryId || null,
            },
            include: {
                category: true,
                menuItems: true,
            },
        });
    },

    async delete(id: string) {
        return prisma.product.delete({
            where: { id },
        });
    },
};