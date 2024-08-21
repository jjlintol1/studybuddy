import { clerkMiddleware } from "@clerk/nextjs/server";

// const isProtectedRoute = createRouteMatcher(["/client"]);

export default clerkMiddleware();

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};