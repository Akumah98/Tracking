import { PackageInfoSection } from "@/features/consignment/components/PackageInfoSection";

interface Props {
  data: any;
  onChange: (key: string, value: string) => void;
}

export function UpdatePackageSpecsSection({ data, onChange }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 sm:p-6 shadow-xs">
      <h3 className="text-sm font-heading font-bold text-brand-dark mb-4 border-b border-neutral-100 pb-2">
        Consignment &amp; Logistics Specifications
      </h3>
      <PackageInfoSection data={data} onChange={onChange} />
    </div>
  );
}
