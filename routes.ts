/**
 * An array of routes that are public to everyone with no restriction
 * (doesnot fire the redirection of the middleware)
 * @type {string[]}
 */

export const publicRoutes = ["/auth/login", "/"];

/**
 * An array of routes that are specific for authentecation purposes to enter the main program
 * @type {string[]}
 */

export const authRoutes = [
  "/auth/login",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/two-factor-auth",
];

/**
 * The prefix for apis authentication routes
 * Routes that uses this prefix are associated with authentication
 * @type {string[]}
 */

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_REDIRECT_ROUTE = "/overview";
