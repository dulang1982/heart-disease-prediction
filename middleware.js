import { NextResponse } from "next/server";

export function middleware(req) {
  const protectedRoutes = ["/predict", "/history", "/profile"];
  const authRoutes = ["/auth/signin", "/auth/signup"];
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();

  // console.log("Token in Middleware:", token);

  // If user tries to access protected routes without a token, redirect to /signin
  if (protectedRoutes.includes(url.pathname) && !token) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  // If user tries to access /signin or /signup while logged in, redirect to /
  if (authRoutes.includes(url.pathname) && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/predict", "/history", "/profile", "/auth/signin", "/auth/signup"],
};
