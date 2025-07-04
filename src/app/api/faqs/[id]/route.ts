import { NextRequest } from "next/server";
import { getFaqById, updateFaq, deleteFaq } from "@/backend/faqs/faq.controller";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
    return getFaqById(params.id);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    return updateFaq(request, params.id);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    return deleteFaq(params.id);
}
