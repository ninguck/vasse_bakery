import { NextRequest } from "next/server";
import { getMenuItemById, updateMenuItem, deleteMenuItem } from "@/backend/menuItems/menuItems.controller";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
    return getMenuItemById(params.id);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    return updateMenuItem(request, params.id);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    return deleteMenuItem(params.id);
}