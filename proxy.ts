import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function proxy(req) {
    const pathname = req.nextUrl.pathname
    const token = req.nextauth.token

    if (pathname === "/login" && token) {
      return NextResponse.redirect(
        new URL("/dashboard/overview", req.url)
      )
    }

    if (pathname === "/dashboard") {
      return NextResponse.redirect(
        new URL("/dashboard/overview", req.url)
      )
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname

        if (pathname === "/login") {
          return true
        }

        if (
          pathname.startsWith("/dashboard") ||
          pathname.startsWith("/profile")
        ) {
          return !!token
        }


        return true
      }
    },

    pages: {
      signIn: "/login",
    },
  },
)

export const config = {
  matcher: [
    '/',
    "/login",
    "/dashboard/:path*",
    "/profile/:path*",
  ]
}