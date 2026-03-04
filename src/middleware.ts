import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 保护控制面板和登录页
  const protectedPaths = ["/shion-control-panel", "/shion-login"];
  const isProtected = protectedPaths.some(path => 
    request.nextUrl.pathname === path || request.nextUrl.pathname.startsWith(`${path}/`)
  );

  if (isProtected) {
    const session = request.cookies.get("admin_session");
    
    // 如果是登录页且未登录，允许访问
    if (request.nextUrl.pathname === "/shion-login" && (!session || session.value !== "true")) {
      return NextResponse.next();
    }
    
    // 如果是控制面板且未登录，重定向到登录页
    if (request.nextUrl.pathname.startsWith("/shion-control-panel") && (!session || session.value !== "true")) {
      const loginUrl = new URL("/shion-login", request.url);
      return NextResponse.redirect(loginUrl);
    }
    
    // 如果已登录且访问登录页，重定向到控制面板
    if (request.nextUrl.pathname === "/shion-login" && session?.value === "true") {
      const adminUrl = new URL("/shion-control-panel", request.url);
      return NextResponse.redirect(adminUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/shion-control-panel/:path*", "/shion-login"],
};
