import { NextRequest } from "next/server";
import { getAllFaqs, createFaq } from "@/backend/faqs/faq.controller";

export async function GET() {
    return getAllFaqs();
}

export async function POST(request: NextRequest) {
    return createFaq(request);
}
