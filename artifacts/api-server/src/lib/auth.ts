import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const ADMIN_SESSION_COOKIE = "avdar_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET must be set to issue admin sessions.");
  }
  return secret;
}

export function signAdminSession(): string {
  return jwt.sign({ role: "admin" }, getSessionSecret(), {
    expiresIn: SESSION_TTL_SECONDS,
  });
}

export function verifyAdminSession(token: string): boolean {
  try {
    const payload = jwt.verify(token, getSessionSecret());
    return typeof payload === "object" && payload?.role === "admin";
  } catch {
    return false;
  }
}

export function checkAdminCredentials(username: string, password: string): boolean {
  const expectedUsername = process.env.ADMIN_USERNAME;
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedUsername || !expectedPassword) return false;
  return username === expectedUsername && password === expectedPassword;
}

export function isAdminRequest(req: Request): boolean {
  const token = req.cookies?.[ADMIN_SESSION_COOKIE];
  if (!token || typeof token !== "string") return false;
  return verifyAdminSession(token);
}

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  if (!isAdminRequest(req)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

export function adminCookieOptions() {
  return {
    httpOnly: true as const,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_TTL_SECONDS * 1000,
    path: "/",
  };
}
