import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const PUBLIC_ROUTES = ["/", "/empleo", "/empleo/auth"]
const PROTECTED_PREFIXES = ["/empleo/dashboard", "/empleo/premium"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isPublic = PUBLIC_ROUTES.some(r => pathname === r || pathname.startsWith(r + "/"))
  const isProtected = PROTECTED_PREFIXES.some(p => pathname.startsWith(p))

  if (isProtected && !isPublic) {
    const hasSession = request.cookies.get("ds-session")
    if (!hasSession) {
      const url = request.nextUrl.clone()
      url.pathname = "/"
      url.searchParams.set("redirect", pathname)
      return NextResponse.redirect(url)
    }
  }

  const response = NextResponse.next()
  response.headers.set("x-pathname", pathname)
  return response
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
