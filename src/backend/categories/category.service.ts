import { prisma } from "@/lib/db";

export const CategoryService = {
    getAll() {
        return prisma.category.findMany({
        include: {
            products: true,
            menuItems: true,
        },
        orderBy: {
            name: "asc",
        },
        });
    },

    getById(id: string) {
        return prisma.category.findUnique({
        where: { id },
        include: {
            products: true,
            menuItems: true,
        },
        });
    },

    async create(name: string) {
        return prisma.category.create({
        data: { name: name.trim() },
        include: { products: true, menuItems: true },
        });
    },

    async update(id: string, name: string) {
        return prisma.category.update({
        where: { id },
        data: { name: name.trim() },
        include: { products: true, menuItems: true },
        });
    },

    async delete(id: string) {
        return prisma.category.delete({
        where: { id },
        });
    },

    async findByName(name: string) {
        return prisma.category.findFirst({
        where: { name: name.trim() },
        });
    },

    async findDuplicateByName(name: string, excludeId: string) {
        return prisma.category.findFirst({
        where: {
            name: name.trim(),
            id: { not: excludeId },
        },
        });
    },
};
