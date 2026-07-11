import { Router, type IRouter } from "express";
import {
  AdminLoginBody,
  AdminLoginResponse,
  AdminLogoutResponse,
  GetAdminSessionResponse,
} from "@workspace/api-zod";
import {
  ADMIN_SESSION_COOKIE,
  adminCookieOptions,
  checkAdminCredentials,
  isAdminRequest,
  signAdminSession,
} from "../lib/auth";

const router: IRouter = Router();

router.post("/admin/login", async (req, res): Promise<void> => {
  const parsed = AdminLoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const { username, password } = parsed.data;
  if (!checkAdminCredentials(username, password)) {
    req.log.warn({ username }, "Admin login failed");
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const token = signAdminSession();
  res.cookie(ADMIN_SESSION_COOKIE, token, adminCookieOptions());
  res.json(AdminLoginResponse.parse({ authenticated: true }));
});

router.post("/admin/logout", async (_req, res): Promise<void> => {
  res.clearCookie(ADMIN_SESSION_COOKIE, adminCookieOptions());
  res.status(204).send();
  void AdminLogoutResponse;
});

router.get("/admin/me", async (req, res): Promise<void> => {
  res.json(GetAdminSessionResponse.parse({ authenticated: isAdminRequest(req) }));
});

export default router;
