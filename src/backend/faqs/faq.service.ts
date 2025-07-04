import { prisma } from "@/lib/db";

export const FaqService = {
    async getAll() {
        return prisma.fAQ.findMany({
        orderBy: { createdAt: "desc" },
        });
    },

    async getById(id: string) {
        return prisma.fAQ.findUnique({
        where: { id },
        });
    },

    async create(data: { question: string; answer: string }) {
        return prisma.fAQ.create({
        data: {
            question: data.question.trim(),
            answer: data.answer.trim(),
        },
        });
    },

    async update(id: string, data: { question: string; answer: string }) {
        return prisma.fAQ.update({
        where: { id },
        data: {
            question: data.question.trim(),
            answer: data.answer.trim(),
        },
        });
    },

    async delete(id: string) {
        return prisma.fAQ.delete({
        where: { id },
        });
    },
};
