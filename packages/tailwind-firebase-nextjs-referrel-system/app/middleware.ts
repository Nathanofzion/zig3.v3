import { auth as middleware } from "@/app/auth/config";
import { NextResponse } from "next/server";

// Not working right now - have to place in main directory outside of app
// Combination of a few new resources
// Auth v5: https://authjs.dev/reference/nextjs#in-middleware
// upgrade guide: https://authjs.dev/guides/upgrade-to-v5
export default middleware((request) => {
    // force login if the user
    if (request.nextUrl.pathname.startsWith("/profile") && !request.auth?.user?.email) {
        return NextResponse.rewrite(new URL("/api/auth/signin", request.url));
    }
});

// match on certain paths
// https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
// export const config = { matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"] };