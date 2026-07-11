import { Router, type IRouter } from "express";
import { ThemeSettingsModel } from "@workspace/db";
import {
  GetThemeSettingsResponse,
  UpdateThemeSettingsBody,
  UpdateThemeSettingsResponse,
} from "@workspace/api-zod";
import { requireAdmin } from "../lib/auth";

const router: IRouter = Router();

async function getOrCreateThemeSettings() {
  let doc = await ThemeSettingsModel.findOne({ id: 1 }).lean();
  if (doc) return doc;
  const created = await ThemeSettingsModel.create({ id: 1 });
  return created.toObject();
}

router.get("/theme-settings", async (_req, res): Promise<void> => {
  const settings = await getOrCreateThemeSettings();
  res.json(GetThemeSettingsResponse.parse(settings));
});

router.put("/theme-settings", requireAdmin, async (req, res): Promise<void> => {
  const parsed = UpdateThemeSettingsBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  await getOrCreateThemeSettings();
  const updated = await ThemeSettingsModel.findOneAndUpdate(
    { id: 1 },
    { $set: parsed.data },
    { new: true }
  ).lean();

  res.json(UpdateThemeSettingsResponse.parse(updated));
});

export default router;
