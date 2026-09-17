import Image from "next/image";
import { Star, Quote } from "lucide-react";
import data from "@/data/data.json";

export function TestimonialsSection() {
  const { testimonials } = data;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-brand">Customer Proof</span>
        <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-dark tracking-tight">
          What Our Clients Are Saying
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500">
          Trusted by enterprise shippers, eCommerce founders, and supply chain directors worldwide.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="apple-glass-card rounded-3xl p-6 sm:p-7 border border-black/[0.06] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Quote className="w-5 h-5 text-brand/30" />
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-black/[0.05]">
              <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-brand/20 shadow-xs">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-heading font-extrabold text-brand-dark leading-tight">{t.name}</p>
                <p className="text-[11px] text-neutral-400 font-medium">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
