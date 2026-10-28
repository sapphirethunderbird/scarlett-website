import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALE_PREFIX, LOCALES } from "@/lib/i18n/config";

/**
 * English keeps the bare URLs the site has always had ("/", "/about"); the
 * pages themselves live under `app/[locale]`, so a bare path is rewritten onto
 * the default locale's segment. Prefixed locales ("/ja/about") already match
 * the route tree and pass through.
 *
 * Rewrite, not redirect: the browser URL stays bare, so existing links, the
 * resume, and anything already indexed keep resolving to the same address.
 *
 * Named `proxy` rather than `middleware`: Next 16 deprecated the middleware
 * file convention in favour of this one.
 */
const PREFIXED = LOCALES.map((l) => LOCALE_PREFIX[l]).filter(Boolean);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Already locale-addressed, including a direct hit on the rewrite target.
  if (
    pathname === `/${DEFAULT_LOCALE}` ||
    pathname.startsWith(`/${DEFAULT_LOCALE}/`) ||
    PREFIXED.some((p) => pathname === p || pathname.startsWith(`${p}/`))
  ) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  /**
   * Everything except API routes (Caddy proxies /api/* to the chat backend and
   * carves out /api/contact for this app), Next's own assets, and files served
   * straight out of public/ — matched by having a dot in the last segment.
   */
  matcher: ["/((?!api/|_next/|.*\\.).*)"],
};
