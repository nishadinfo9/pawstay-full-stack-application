import { withAuth } from "next-auth/middleware"

export default withAuth(
  function proxy(req) {
    const pathname = req.nextUrl.pathname
    const token = req.nextauth.token

    if (pathname === "/login" && token) {
      return Response.redirect(
        new URL("/dashboard", req.url)
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