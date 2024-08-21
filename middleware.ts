import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
    publicRoutes: [
      "/",
      "/api/webhook"
    //   "/question/:id",
    //   "/tags/",
    //   "/tags/:id",
    //   "/profile/:id",
    //   "/community",
    //   "/jobs",
    ],
    ignoredRoutes: ["/api/webhook"],
  });
  
  export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  };