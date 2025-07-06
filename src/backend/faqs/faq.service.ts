import { prisma } from "@/lib/db";
import { 
    FAQ, 
    CreateFAQRequest, 
    UpdateFAQRequest, 
    FAQServiceInterface 
} from "@/types/faqs";

export const FaqService: FAQServiceInterface = {
    async getAll(): Promise<FAQ[]> {
        return prisma.fAQ.findMany({
            orderBy: { createdAt: "desc" },
        });
    },

    async getById(id: string): Promise<FAQ | null> {
        return prisma.fAQ.findUnique({
            where: { id },
        });
    },

    async create(data: CreateFAQRequest): Promise<FAQ> {
        return prisma.fAQ.create({
            data: {
                question: data.question.trim(),
                answer: data.answer.trim(),
            },
        });
    },

    async update(id: string, data: UpdateFAQRequest): Promise<FAQ> {
        return prisma.fAQ.update({
            where: { id },
            data: {
                question: data.question?.trim(),
                answer: data.answer?.trim(),
            },
        });
    },

    async delete(id: string): Promise<void> {
        await prisma.fAQ.delete({
            where: { id },
        });
    },
};
