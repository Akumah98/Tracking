import { Check } from "lucide-react";

export function OverrideSuccessView() {
  return (
    <div className="py-6 text-center space-y-2">
      <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
        <Check className="w-5 h-5" />
      </div>
      <p className="text-xs font-bold text-emerald-700">
        Audit Manifest Updated &amp; Map Repositioned!
      </p>
    </div>
  );
}
