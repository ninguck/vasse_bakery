"use client";

import type { ReactNode } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-beige">
      {/* Sidebar (desktop only) */}
      <div className="hidden lg:block fixed left-0 top-[73px] h-[calc(100vh-73px)] w-64 z-40">
        <AdminSidebar />
      </div>

      {/* HEADER - should NOT be offset by sidebar */}
      <div className="z-30">
        <AdminHeader />
      </div>

      {/* MAIN - only this needs to be pushed aside for sidebar */}
      <div className="lg:ml-64">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
