"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Truck, AlertTriangle, ArrowLeft, ShieldCheck, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdminAuth } from "@/features/auth/hooks/useAdminAuth";

const links = [
  { href: "/admin/dashboard", label: "KPI Overview", icon: LayoutDashboard },
  { href: "/admin/dashboard/shipments", label: "Fleet & Map", icon: Truck },
  { href: "/admin/dashboard/exceptions", label: "Exceptions", icon: AlertTriangle },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { handleSignOut } = useAdminAuth();

  return (
    <aside className="w-64 bg-brand-dark text-neutral-300 h-full overflow-y-auto p-5 flex flex-col justify-between border-r border-neutral-800">
      <div className="space-y-8">
        <div className="flex items-center gap-2.5 px-2">
          <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-white">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-heading font-extrabold text-sm text-white leading-tight">
              CONTROL TOWER
            </h2>
            <span className="text-[10px] text-brand uppercase font-mono font-semibold">
              Supabase Authenticated
            </span>
          </div>
        </div>

        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all",
                  isActive
                    ? "bg-brand text-white shadow-sm"
                    : "text-neutral-300 hover:text-white hover:bg-neutral-800/60"
                )}
              >
                <Icon className="w-4 h-4 text-white" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-6 border-t border-neutral-800 px-2 space-y-3">
        <div className="text-[11px] text-neutral-500 font-mono">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-2" />
          Supabase Session: Active
        </div>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-2 text-xs text-rose-400 hover:text-rose-300 transition-colors py-1 cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5 text-white" />
          Terminate Session (Sign Out)
        </button>
        <Link
          href="/"
          className="flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-white" />
          Back to Public Portal
        </Link>
      </div>
    </aside>
  );
}
