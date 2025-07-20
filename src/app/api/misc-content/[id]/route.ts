import { NextRequest } from "next/server";
import { getMiscContentById, updateMiscContent, deleteMiscContent } from "@/backend/miscContent/miscContent.controller";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  return getMiscContentById(params.id);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  return updateMiscContent(request, params.id);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  return deleteMiscContent(params.id);
} 