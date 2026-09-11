"use client";

import { Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminAuth } from "../hooks/useAdminAuth";

export function AdminLoginForm() {
  const { email, setEmail, password, setPassword, loading, error, handleLogin } =
    useAdminAuth();

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      {error && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label className="text-xs font-semibold text-neutral-700 block mb-1">
          Supabase Admin Email
        </label>
        <div className="relative">
          <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <Input
            type="email"
            required
            placeholder="admin@intl-linelogistics.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-9 text-xs h-11"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-neutral-700 block mb-1">
          Security Password
        </label>
        <div className="relative">
          <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <Input
            type="password"
            required
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-9 text-xs h-11"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-brand hover:bg-brand-secondary text-white font-semibold text-xs h-11 flex items-center justify-center gap-2 shadow-md active:scale-[0.99] transition-all"
      >
        {loading ? "Verifying Supabase Session..." : "Authorize Control Tower Access"}
        <ArrowRight className="w-4 h-4" />
      </Button>
    </form>
  );
}
