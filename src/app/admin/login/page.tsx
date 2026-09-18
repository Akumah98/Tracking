import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { AdminLoginForm } from "@/features/auth/components/AdminLoginForm";
import data from "@/data/data.json";

export const metadata = {
  title: "Admin Control Tower Login | International Transport Line",
  description: "Secure Supabase-authenticated administrative gateway for ITL logistics operations.",
};

export default function AdminLoginPage() {
  const { branding } = data.siteMedia;

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ff5705_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 border border-neutral-100">
        <div className="text-center space-y-2">
          <div className="relative w-14 h-14 mx-auto flex items-center justify-center">
            <Image
              src={branding.logoColor}
              alt={branding.alt}
              width={56}
              height={56}
              priority
              className="w-14 h-14 object-contain drop-shadow-xs"
            />
          </div>
          <h1 className="text-2xl font-heading font-extrabold text-brand-dark">
            Control Tower Login
          </h1>
          <p className="text-xs text-neutral-500">
            Protected via Supabase Auth & Role-Based Access Control
          </p>
        </div>

        <AdminLoginForm />

        <div className="pt-4 border-t border-neutral-100 text-center text-[11px] text-neutral-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Supabase Cloud JWT • 256-bit TLS Session Gateway</span>
        </div>
      </div>
    </div>
  );
}
