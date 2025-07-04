import { NextRequest, NextResponse } from "next/server";
import { FaqService } from "./faq.service";

export async function getAllFaqs() {
    try {
        const faqs = await FaqService.getAll();
        return NextResponse.json(faqs);
    } catch (error) {
        console.error("Error fetching FAQs:", error);
        return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 });
    }
}

export async function getFaqById(id: string) {
    try {
        const faq = await FaqService.getById(id);
        if (!faq) {
        return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
        }
        return NextResponse.json(faq);
    } catch (error) {
        console.error("Error fetching FAQ:", error);
        return NextResponse.json({ error: "Failed to fetch FAQ" }, { status: 500 });
    }
}

export async function createFaq(request: NextRequest) {
    try {
        const body = await request.json();
        const { question, answer } = body;

        if (!question || !answer) {
        return NextResponse.json(
            { error: "Question and answer are required" },
            { status: 400 }
        );
        }

        const faq = await FaqService.create({ question, answer });
        return NextResponse.json(faq, { status: 201 });

    } catch (error) {
        console.error("Error creating FAQ:", error);
        return NextResponse.json({ error: "Failed to create FAQ" }, { status: 500 });
    }
}

export async function updateFaq(request: NextRequest, id: string) {
    try {
        const body = await request.json();
        const { question, answer } = body;

        const existing = await FaqService.getById(id);
        if (!existing) {
        return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
        }

        if (!question || !answer) {
        return NextResponse.json(
            { error: "Question and answer are required" },
            { status: 400 }
        );
        }

        const updated = await FaqService.update(id, { question, answer });
        return NextResponse.json(updated);

    } catch (error) {
        console.error("Error updating FAQ:", error);
        return NextResponse.json({ error: "Failed to update FAQ" }, { status: 500 });
    }
}

export async function deleteFaq(id: string) {
    try {
        const existing = await FaqService.getById(id);
        if (!existing) {
        return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
        }

        await FaqService.delete(id);
        return NextResponse.json({ message: "FAQ deleted successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error deleting FAQ:", error);
        return NextResponse.json({ error: "Failed to delete FAQ" }, { status: 500 });
    }
}
