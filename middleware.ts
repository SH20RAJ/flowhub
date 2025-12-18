import { stackServerApp } from "@/stack/server";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const user = await stackServerApp.getUser();

    const protectedRoutes = ["/submit", "/profile", "/my-workflows"];
    const isProtected = protectedRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
    );

    if (isProtected && !user) {
        return NextResponse.redirect(new URL(stackServerApp.urls.signIn, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
