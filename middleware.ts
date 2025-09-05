import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

// List public routes (everything else is protected)
const publicRoutes = ["/auth"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await cookies();
  const hasSession = !!session.get("ssid");

  // 🚫 Prevent logged-in users from accessing /auth/*
  if (publicRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))) {
    if (hasSession) {
      // redirect authenticated users away from auth pages
      return NextResponse.redirect(new URL(`/${session.get("ssid")?.value}`, request.url));
    }
    return NextResponse.next();
  }

  // 🔒 Protect all other routes: redirect to login if no session
  if (!hasSession) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|webp|gif|ico|ttf|woff|woff2|eot)).*)",
  ],
};
