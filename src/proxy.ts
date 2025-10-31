import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

type Session = typeof auth.$Infer.Session;

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  // Handle /@username pattern - rewrite to /username (public)
  if (pathname.match(/^\/@[^/]+$/)) {
    const username = pathname.slice(2); // Remove the /@ prefix
    url.pathname = `/${username}`;
    return NextResponse.rewrite(url);
  }

  // Auth check only for /dashboard routes
  if (pathname.startsWith("/dashboard")) {
    const { data: session } = await betterFetch<Session>(
      "/api/auth/get-session",
      {
        baseURL: request.nextUrl.origin,
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
      }
    );

    if (!session) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/@:username*"],
};
