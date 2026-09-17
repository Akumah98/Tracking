import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceCardWithImageProps {
  service: {
    id: string;
    title: string;
    description: string;
    image: string;
    features: string[];
  };
  Icon: LucideIcon;
}

export function ServiceCardWithImage({ service, Icon }: ServiceCardWithImageProps) {
  return (
    <div className="apple-glass-card rounded-3xl overflow-hidden border border-black/[0.06] shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group">
      {/* Image Banner */}
      <div className="relative h-48 sm:h-56 w-full overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-4 left-4 w-10 h-10 rounded-2xl bg-white/95 text-brand flex items-center justify-center shadow-md backdrop-blur-md">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-7 space-y-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="text-xl font-heading font-extrabold text-brand-dark tracking-tight">
            {service.title}
          </h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            {service.description}
          </p>
        </div>

        <div className="space-y-2.5 pt-3 border-t border-black/[0.05]">
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
            Capabilities
          </span>
          <ul className="grid grid-cols-2 gap-2 text-xs text-neutral-700 font-medium">
            {service.features.map((feat, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                <span className="truncate">{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-2">
          <Link href="/contact">
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs font-bold gap-1.5 rounded-xl border-black/[0.1] hover:bg-brand hover:text-white hover:border-brand transition-colors h-10"
            >
              Request Quote &amp; SLA Details <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
