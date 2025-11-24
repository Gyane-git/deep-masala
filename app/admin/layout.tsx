"use client";

import AdminHeaderBar from "@/components/admin-HeaderBar";
import SideHeaderBar from "@/components/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <AdminHeaderBar />
      
      <div className="flex flex-1 overflow-hidden">
        <SideHeaderBar />
        
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
