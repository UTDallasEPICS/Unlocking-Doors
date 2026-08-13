import { auth } from "../utils/auth";
import { prisma } from "../utils/prisma";

export default defineEventHandler(async (event) => {
  // Attach Prisma client to context for all handlers
  event.context.client = prisma;

  const path = event.node.req.url || "";

  // Skip auth checks for auth endpoints, login page, and Nuxt internal assets/dev tools
  if (
    path.startsWith("/api/auth") ||
    path.startsWith("/login") ||
    path.startsWith("/_nuxt") ||
    path.includes("__nuxt") ||
    path.includes("favicon.ico")
  ) {
    return;
  }

  try {
    const session = await auth.api.getSession({
      headers: event.headers,
    });

    if (!session) {
      // Clear cookies if session expired
      setCookie(event, "uduser", "");
      return await sendRedirect(event, "/login");
    }

    // Attach user information to event context
    event.context.user = session.user;
    event.context.session = session.session;

    // Set compatibility cookie for frontend role checks
    setCookie(event, "uduser", JSON.stringify(session.user));
  } catch (error) {
    console.error("[Auth Middleware Error]:", error);
    setCookie(event, "uduser", "");
    return await sendRedirect(event, "/login");
  }
});
