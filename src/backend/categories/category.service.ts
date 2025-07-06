import { prisma } from "@/lib/db";
import { 
    Category, 
    CategoryServiceInterface 
} from "@/types/categories";

export const CategoryService: CategoryServiceInterface = {
    async getAll(): Promise<Category[]> {
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

    async getById(id: string): Promise<Category | null> {
        return prisma.category.findUnique({
            where: { id },
            include: {
                products: true,
                menuItems: true,
            },
        });
    },

    async create(name: string): Promise<Category> {
        return prisma.category.create({
            data: { name: name.trim() },
            include: { products: true, menuItems: true },
        });
    },

    async update(id: string, name: string): Promise<Category> {
        return prisma.category.update({
            where: { id },
            data: { name: name.trim() },
            include: { products: true, menuItems: true },
        });
    },

    async delete(id: string): Promise<void> {
        await prisma.category.delete({
            where: { id },
        });
    },

    async findByName(name: string): Promise<Category | null> {
        return prisma.category.findFirst({
            where: { name: name.trim() },
        });
    },

    async findDuplicateByName(name: string, excludeId: string): Promise<Category | null> {
        return prisma.category.findFirst({
            where: {
                name: name.trim(),
                id: { not: excludeId },
            },
        });
    },
};
