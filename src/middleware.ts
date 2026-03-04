import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/shion-control-panel" || request.nextUrl.pathname.startsWith("/shion-control-panel/")) {
    const session = request.cookies.get("admin_session");
    
    if (!session || session.value !== "true") {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/shion-control-panel", "/shion-control-panel/:path*"],
};
