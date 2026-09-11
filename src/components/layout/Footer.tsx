import Link from "next/link";
import { Truck, Mail, Phone, MapPin, Globe } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="w-full bg-[#0E131F] text-neutral-300 pt-16 pb-10 border-t border-white/[0.08]">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/[0.08]">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-brand flex items-center justify-center text-white shadow-sm ring-1 ring-white/20">
                <Truck className="w-5 h-5" />
              </div>
              <span className="font-heading font-extrabold text-lg text-white tracking-tight">INTERNATIONAL TRANSPORT LINE</span>
            </div>
            <p className="text-sm text-neutral-400 max-w-md leading-relaxed">
              Transporting goods round the globe. We are your trusted partner in moving shipments, eliminating logistics friction, and connecting businesses worldwide with care.
            </p>
            <div className="flex items-center gap-3 text-xs text-neutral-400 pt-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08]"><Globe className="w-3.5 h-3.5 text-brand" /> 220 Countries</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08]">24/7 Live Telemetry</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08]">Zero Friction</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-xs tracking-wider uppercase text-neutral-400">Platform</h4>
            <ul className="space-y-2 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-neutral-400 hover:text-white transition-colors py-0.5 block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-xs tracking-wider uppercase text-neutral-400">Direct Operations</h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand" />
                <span>ops@internationaltransportline.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand" />
                <span>+1 (800) 459-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand" />
                <span>Global Freight Network • 220 Regions</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} International Transport Line. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-neutral-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-neutral-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-neutral-300 cursor-pointer">Security Center</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
