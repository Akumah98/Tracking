"use client";

import data from "@/data/data.json";
import { Mail, HelpCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function ContactPage() {
  const { faqs } = data;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 sm:py-16 space-y-16">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-brand">24/7 Dedicated Support</span>
        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-brand-dark">
          Connect With Our Operations Team
        </h1>
        <p className="text-sm text-neutral-500 max-w-xl mx-auto">
          We are here to support your global shipping needs with personalized care, real-time waybill updates, and friction-free logistics solutions.
        </p>
      </div>

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 apple-glass-card rounded-3xl border border-black/[0.06] p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-2 pb-4 border-b border-black/[0.05]">
            <Mail className="w-5 h-5 text-brand" />
            <h2 className="font-heading font-extrabold text-lg text-brand-dark tracking-tight">Direct Customer Inquiry</h2>
          </div>

          {submitted ? (
            <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center space-y-2">
              <span className="text-emerald-700 font-bold text-sm block">Inquiry Dispatched!</span>
              <p className="text-xs text-emerald-600">A dedicated logistics specialist will reach out within 30 minutes.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">Full Name</label>
                <Input required placeholder="Alexander Vance" className="h-11 rounded-xl border-black/[0.08]" />
              </div>
              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">Email Address</label>
                <Input type="email" required placeholder="alex@company.com" className="h-11 rounded-xl border-black/[0.08]" />
              </div>
              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">Waybill / Subject</label>
                <Input required placeholder="Waybill #ITL-894201 or Shipping Quote" className="h-11 rounded-xl border-black/[0.08]" />
              </div>
              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">Message</label>
                <textarea required rows={4} className="w-full text-sm rounded-xl border border-black/[0.08] p-3 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all" placeholder="How can our freight team assist you today?" />
              </div>
              <Button type="submit" className="w-full h-12 min-h-[48px] rounded-full bg-brand hover:bg-brand-secondary text-white font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xs">
                <Send className="w-4 h-4" /> Send Message
              </Button>
            </form>
          )}
        </div>

        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-brand" />
            <h2 className="font-heading font-extrabold text-xl text-brand-dark tracking-tight">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq) => (
              <div key={faq.id} className="apple-glass-card rounded-2xl border border-black/[0.05] p-5 space-y-2 hover:border-black/[0.1] transition-all">
                <h4 className="font-heading font-extrabold text-sm text-brand-dark tracking-tight">{faq.question}</h4>
                <p className="text-xs text-neutral-500 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
