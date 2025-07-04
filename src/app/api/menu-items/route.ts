import { NextRequest } from "next/server";
import { getAllMenuItems, createMenuItem } from "@/backend/menuItems/menuItems.controller";

export async function GET() {
    return getAllMenuItems();
}

export async function POST(request: NextRequest) {
    return createMenuItem(request);
}
