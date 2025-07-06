import { prisma } from "@/lib/db";
import { 
    Product, 
    CreateProductRequest, 
    UpdateProductRequest, 
    ProductServiceInterface 
} from "@/types/products";

export const ProductService: ProductServiceInterface = {
    async getAll(): Promise<Product[]> {
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

    async getById(id: string): Promise<Product | null> {
        return prisma.product.findUnique({
            where: { id },
            include: {
                category: true,
                menuItems: true,
            },
        });
    },

    async create(data: CreateProductRequest): Promise<Product> {
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

    async update(id: string, data: UpdateProductRequest): Promise<Product> {
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

    async delete(id: string): Promise<void> {
        await prisma.product.delete({
            where: { id },
        });
    },
};