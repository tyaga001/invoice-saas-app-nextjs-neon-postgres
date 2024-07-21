import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// the createRouteMatcher function accepts an array of routes to be protected
const protectedRoutes = createRouteMatcher(["/customers", "/settings", "/dashboard", "/history", "/invoices(.*)" ]);

// protects the route
export default clerkMiddleware((auth, req) => {
    if (protectedRoutes(req)) {
        auth().protect();
 }
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};