import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { isAuthorizedAdmin } from "@/lib/supabase/roles";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { supabaseResponse, user } = await updateSession(request);

  // 1. If already logged in as authorized admin and navigating to login page, send to dashboard
  if (pathname === "/admin/login") {
    if (user && isAuthorizedAdmin(user)) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    return supabaseResponse;
  }

  // 2. Protect Admin Portal UI routes
  if (pathname.startsWith("/admin")) {
    if (!user || !isAuthorizedAdmin(user)) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return supabaseResponse;
  }

  // 3. Protect Admin API mutation endpoints
  if (pathname.startsWith("/api/admin")) {
    if (!user || !isAuthorizedAdmin(user)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Supabase Admin authorization required." },
        { status: 401 }
      );
    }
    return supabaseResponse;
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
