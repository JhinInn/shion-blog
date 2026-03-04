import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 只保护 /admin 路径，但排除 /admin 本身的检查（让页面能正常显示）
  if (request.nextUrl.pathname === "/admin" || request.nextUrl.pathname.startsWith("/admin/")) {
    // 检查 session cookie
    const session = request.cookies.get("admin_session");
    
    if (!session || session.value !== "true") {
      // 未登录，重定向到登录页
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
