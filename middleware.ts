import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

// List public routes (everything else is protected)
const publicRoutes = ["/auth"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If route is public, allow it
  if (publicRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))) {
    return NextResponse.next();
  }

  // Check session (for protected routes)
  const session = await cookies();

  // Redirect to the login page if there is no session
  if (!session.get("ssid")) {
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
