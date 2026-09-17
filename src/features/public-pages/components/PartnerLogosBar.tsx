import Image from "next/image";
import data from "@/data/data.json";

export function PartnerLogosBar() {
  const { partners } = data;

  return (
    <div className="py-8 border-y border-black/[0.06] bg-neutral-50/50">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-center text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-6">
          Accredited Global Transit Alliances &amp; Maritime Port Operators
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-center justify-center">
          {partners.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-center p-3 rounded-xl hover:bg-white/80 transition-all group"
            >
              <div className="relative h-10 w-36 opacity-70 group-hover:opacity-100 transition-opacity">
                <Image
                  src={p.logo}
                  alt={p.name}
                  fill
                  sizes="150px"
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
