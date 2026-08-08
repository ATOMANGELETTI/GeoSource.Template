/**
 * Next.js Middleware — currently a no-op placeholder.
 *
 * Middleware runs before requests are processed. In a Tauri static export
 * (`output: 'export'`), middleware is NOT executed at runtime — it only
 * applies when running the Next.js dev server.
 *
 * Reserved for future use cases:
 * - Route guards / authentication
 * - Request header manipulation
 * - Locale detection
 *
 * To activate, uncomment and implement the matcher + handler below.
 */

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
//
// export function middleware(request: NextRequest) {
//   return NextResponse.next();
// }
//
// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
// };
