import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "", // Forward the cookies from the request
      },
    }
  );

  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|trpc|.+\\.[\\w]+$|_next|sign-in|$).*)"],
};

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const url = request.nextUrl.clone();
//   const { pathname } = url; // Handle /@username pattern
//   if (pathname.match(/^\/@[^/]+$/)) {
//     // Extract the username (everything after the @)
//     const username = pathname.slice(2); // Remove the /@ prefix
//     // Rewrite to the /profile/username route
//     url.pathname = `/profile/${username}`;
//     return NextResponse.rewrite(url);
//   }
//   return NextResponse.next();
// }
// export const config = {
//   matcher: ["/@:username*"],
// };
