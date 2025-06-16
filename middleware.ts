import { auth } from "@/auth";
import {
  DEFAULT_REDIRECT_ROUTE,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "./routes";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Define route types
  const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Handle API routes
  if (isApiRoute) {
    return NextResponse.next();
  }

  // Handle authentication routes
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_REDIRECT_ROUTE, nextUrl));
    }
    return NextResponse.next();
  }

  // Handle protected routes
  if (!isLoggedIn && !isPublicRoute) {
    const searchParams = new URLSearchParams({
      callbackUrl: nextUrl.pathname + nextUrl.search,
    });

    return NextResponse.redirect(
      new URL(`/auth/login?${searchParams.toString()}`, nextUrl),
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
