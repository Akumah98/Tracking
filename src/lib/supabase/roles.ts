import { User } from "@supabase/supabase-js";

export function isAuthorizedAdmin(user: User | null): boolean {
  if (!user) return false;

  // 1. Check official Supabase app_metadata role (set via Supabase dashboard / server)
  const role = user.app_metadata?.role;
  if (role === "admin" || role === "OPERATOR" || role === "superadmin") {
    return true;
  }

  // 2. If app_metadata.role is not explicitly set yet, allow users created directly in console
  // or matching your admin email
  if (user.email && (user.email.includes("admin") || user.app_metadata?.provider === "email")) {
    return true;
  }

  return false;
}
