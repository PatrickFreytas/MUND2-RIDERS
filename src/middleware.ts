import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const config = {
  // The root path "/" is not matched by the matcher, so it's not included here
  matcher: [
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).+)",
    "/dashboard/:path*",
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const token = await getToken({req});

  if (
    !token &&
    url.pathname.startsWith("/dashboard") &&
    !url.pathname.startsWith("/login")
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
