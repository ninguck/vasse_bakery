import { prisma } from "@/lib/db";

export interface MiscContent {
  id: string;
  section: string;
  imageUrl?: string | null;
  icon?: string | null;
  largeText?: string | null;
  smallText?: string | null;
  message?: string | null;
  createdAt: Date;
}

export interface CreateMiscContentRequest {
  section: string;
  imageUrl?: string;
  icon?: string;
  largeText?: string;
  smallText?: string;
  message?: string;
}

export interface UpdateMiscContentRequest {
  section?: string;
  imageUrl?: string;
  icon?: string;
  largeText?: string;
  smallText?: string;
  message?: string;
}

export interface MiscContentServiceInterface {
  getAll(section?: string): Promise<MiscContent[]>;
  getById(id: string): Promise<MiscContent | null>;
  create(data: CreateMiscContentRequest): Promise<MiscContent>;
  update(id: string, data: UpdateMiscContentRequest): Promise<MiscContent>;
  delete(id: string): Promise<void>;
}

export const MiscContentService: MiscContentServiceInterface = {
  async getAll(section?: string): Promise<MiscContent[]> {
    const where = section ? { section } : undefined;
    return prisma.miscContent.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
  },

  async getById(id: string): Promise<MiscContent | null> {
    return prisma.miscContent.findUnique({
      where: { id },
    });
  },

  async create(data: CreateMiscContentRequest): Promise<MiscContent> {
    return prisma.miscContent.create({
      data: {
        section: data.section,
        imageUrl: data.imageUrl || null,
        icon: data.icon || null,
        largeText: data.largeText || null,
        smallText: data.smallText || null,
        message: data.message || null,
      },
    });
  },

  async update(id: string, data: UpdateMiscContentRequest): Promise<MiscContent> {
    return prisma.miscContent.update({
      where: { id },
      data: {
        section: data.section,
        imageUrl: data.imageUrl,
        icon: data.icon,
        largeText: data.largeText,
        smallText: data.smallText,
        message: data.message,
      },
    });
  },

  async delete(id: string): Promise<void> {
    await prisma.miscContent.delete({
      where: { id },
    });
  },
}; 