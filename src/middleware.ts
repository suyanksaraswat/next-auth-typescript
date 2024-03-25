import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { CustomUser } from "./app/api/auth/[...nextauth]/options";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname == "/login" || pathname == "/admin/login") {
    return NextResponse.next();
  }

  const token = await getToken({ req: request });

  // * Protected routes for user
  const userProtectedRoutes = ["/"];

  if (token == null && userProtectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const user: CustomUser | null = token?.user as CustomUser;

  if (
    user?.role === "role1" &&
    ["/analyze-criteria", "/rate-of-arrival"].includes(pathname)
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (
    user?.role === "role2" &&
    ["/cohort", "/rate-of-arrival"].includes(pathname)
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (
    user?.role === "role3" &&
    ["cohort", "/analyze-criteria"].includes(pathname)
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}

// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";
// import { CustomUser } from "./app/api/auth/[...nextauth]/options";

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   if (pathname == "/login" || pathname == "/admin/login") {
//     return NextResponse.next();
//   }

//   const token = await getToken({ req: request });

//   // * Protected routes for user
//   const userProtectedRoutes = ["/"];

//   // * Protected routes for admin
//   const adminProtectedRoutes = ["/admin/dashboard"];

//   if (
//     token == null &&
//     (userProtectedRoutes.includes(pathname) ||
//       adminProtectedRoutes.includes(pathname))
//   ) {
//     return NextResponse.redirect(
//       new URL(
//         "/login?error=Please login first to access this route",
//         request.url
//       )
//     );
//   }

//   //   * Get user from token
//   const user: CustomUser | null = token?.user as CustomUser;

//   // * if user try to access admin routes
//   if (adminProtectedRoutes.includes(pathname) && user.role == "User") {
//     return NextResponse.redirect(
//       new URL(
//         "/admin/login?error=Please login first to access this route.",
//         request.url
//       )
//     );
//   }

//   //   * If Admin try to access user routes
//   if (userProtectedRoutes.includes(pathname) && user.role == "Admin") {
//     return NextResponse.redirect(
//       new URL(
//         "/login?error=Please login first to access this route.",
//         request.url
//       )
//     );
//   }
// }
