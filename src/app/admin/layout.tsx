import { AdminSidebar } from "@/components/layout/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden">
      <div className="hidden md:block sticky top-0 h-screen shrink-0 z-30">
        <AdminSidebar />
      </div>
      <main className="flex-1 h-screen overflow-y-auto overflow-x-hidden p-6 sm:p-8 lg:p-10">
        {children}
      </main>
    </div>
  );
}
