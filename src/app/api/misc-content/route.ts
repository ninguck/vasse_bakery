import { NextRequest } from "next/server";
import { getAllMiscContent, createMiscContent } from "@/backend/miscContent/miscContent.controller";

export async function GET(request: NextRequest) {
  return getAllMiscContent(request);
}

export async function POST(request: NextRequest) {
  return createMiscContent(request);
} 