import type { ContactPerson } from "@/types/consignment.types";

interface Props {
  label: string;
  data: ContactPerson;
  onChange: (key: keyof ContactPerson, value: string) => void;
}

const field = (label: string, key: keyof ContactPerson, placeholder: string, type = "text") => ({
  label, key, placeholder, type,
});

const FIELDS = [
  field("Full Name", "name", "e.g. John Doe"),
  field("Email Address", "email", "e.g. john@example.com", "email"),
  field("Phone Number", "phone", "e.g. +1 555 000 0000", "tel"),
  field("House Address", "address", "e.g. 12 Baker Street"),
  field("Town / City", "city", "e.g. London"),
];

export function ContactInfoSection({ label, data, onChange }: Props) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-heading font-bold text-brand-dark border-b border-neutral-100 pb-2">
        {label}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {FIELDS.map(({ label: l, key, placeholder, type }) => (
          <div key={key} className={key === "address" ? "sm:col-span-2" : ""}>
            <label className="text-xs font-semibold text-neutral-600 block mb-1">{l} *</label>
            <input
              type={type}
              value={data[key]}
              onChange={(e) => onChange(key, e.target.value)}
              placeholder={placeholder}
              className="w-full text-xs rounded-xl border border-neutral-200 bg-neutral-50/50 p-2.5 focus:border-brand focus:outline-none"
              required
            />
          </div>
        ))}
      </div>
    </div>
  );
}
