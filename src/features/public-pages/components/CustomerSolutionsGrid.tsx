import Image from "next/image";
import Link from "next/link";
import { ArrowRight, RotateCcw, PackageCheck } from "lucide-react";
import data from "@/data/data.json";

export function CustomerSolutionsGrid() {
  const { returnsEasy, businessDelivery } = data.siteMedia;

  const solutions = [
    {
      title: "We Make Customer Returns Easy",
      description: "Together, we empower global businesses to offer friction-free returns by combining smart tracking tech with streamlined depot handoffs.",
      image: returnsEasy.url,
      alt: returnsEasy.alt,
      icon: RotateCcw,
      tag: "Zero Box Required",
      href: "/services",
    },
    {
      title: "Deliver More Than Just Packages",
      description: "See why modern businesses trust International Transport Line for rapid, verified door-to-door freight shipping and courier fulfillment.",
      image: businessDelivery.url,
      alt: businessDelivery.alt,
      icon: PackageCheck,
      tag: "White-Glove Service",
      href: "/services",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-brand">Customer Solutions</span>
        <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-dark tracking-tight">
          World-Class Services You Can Count On
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500">Customer first, people led, innovation driven.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {solutions.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="apple-glass-card rounded-3xl overflow-hidden border border-black/[0.06] shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between"
            >
              <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-brand-dark/90 text-white text-[11px] font-semibold px-3 py-1.5 rounded-full backdrop-blur-md flex items-center gap-1.5 shadow-sm">
                  <Icon className="w-3.5 h-3.5 text-white" />
                  <span>{item.tag}</span>
                </div>
              </div>

              <div className="p-6 sm:p-7 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-heading font-extrabold text-brand-dark tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-black/[0.05]">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:text-brand-dark transition-colors"
                  >
                    <span>Learn how it works</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
