import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((request) => {
  const { pathname } = request.nextUrl;
  const isLogin = pathname.startsWith("/admin/login");
  const isAdmin = pathname.startsWith("/admin");

  if (!isAdmin) return NextResponse.next();

  if (isLogin) {
    if (request.auth) {
      return NextResponse.redirect(new URL("/admin", request.nextUrl));
    }
    return NextResponse.next();
  }

  if (!request.auth) {
    const loginUrl = new URL("/admin/login", request.nextUrl);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
