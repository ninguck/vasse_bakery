import { NextRequest, NextResponse } from "next/server";
import { MiscContentService } from "./miscContent.service";
import { 
  CreateMiscContentRequest, 
  UpdateMiscContentRequest 
} from "./miscContent.service";

export async function getAllMiscContent(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section') || undefined;
    
    const items = await MiscContentService.getAll(section);
    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching misc content:", error);
    return NextResponse.json({ error: "Failed to fetch misc content" }, { status: 500 });
  }
}

export async function getMiscContentById(id: string): Promise<NextResponse> {
  try {
    const item = await MiscContentService.getById(id);
    if (!item) {
      return NextResponse.json({ error: "Misc content not found" }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    console.error("Error fetching misc content:", error);
    return NextResponse.json({ error: "Failed to fetch misc content" }, { status: 500 });
  }
}

export async function createMiscContent(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { section, imageUrl, icon, largeText, smallText, message } = body;
    
    if (!section) {
      return NextResponse.json({ error: "Section is required" }, { status: 400 });
    }

    const data: CreateMiscContentRequest = {
      section,
      imageUrl,
      icon,
      largeText,
      smallText,
      message,
    };

    const item = await MiscContentService.create(data);
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("Error creating misc content:", error);
    return NextResponse.json({ error: "Failed to create misc content" }, { status: 500 });
  }
}

export async function updateMiscContent(request: NextRequest, id: string): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { section, imageUrl, icon, largeText, smallText, message } = body;
    
    if (section === undefined || section === null || section === "") {
      return NextResponse.json({ error: "Section is required" }, { status: 400 });
    }

    const existing = await MiscContentService.getById(id);
    if (!existing) {
      return NextResponse.json({ error: "Misc content not found" }, { status: 404 });
    }

    const data: UpdateMiscContentRequest = {
      section,
      imageUrl,
      icon,
      largeText,
      smallText,
      message,
    };

    const updated = await MiscContentService.update(id, data);
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating misc content:", error);
    return NextResponse.json({ error: "Failed to update misc content" }, { status: 500 });
  }
}

export async function deleteMiscContent(id: string): Promise<NextResponse> {
  try {
    const existing = await MiscContentService.getById(id);
    if (!existing) {
      return NextResponse.json({ error: "Misc content not found" }, { status: 404 });
    }

    await MiscContentService.delete(id);
    return NextResponse.json({ message: "Misc content deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting misc content:", error);
    return NextResponse.json({ error: "Failed to delete misc content" }, { status: 500 });
  }
} 