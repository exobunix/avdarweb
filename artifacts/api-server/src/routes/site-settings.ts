import { Router, type IRouter } from "express";
import { SiteSettingsModel } from "@workspace/db";
import { GetSiteSettingsResponse, UpdateSiteSettingsBody, UpdateSiteSettingsResponse } from "@workspace/api-zod";
import { requireAdmin } from "../lib/auth";

const router: IRouter = Router();

async function getOrCreateSiteSettings() {
  let doc = await SiteSettingsModel.findOne({ id: 1 }).lean();
  if (doc) return doc;
  const created = await SiteSettingsModel.create({ id: 1 });
  return created.toObject();
}

router.get("/site-settings", async (_req, res): Promise<void> => {
  const settings = await getOrCreateSiteSettings();
  res.json(GetSiteSettingsResponse.parse(settings));
});

router.put("/site-settings", requireAdmin, async (req, res): Promise<void> => {
  const parsed = UpdateSiteSettingsBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  await getOrCreateSiteSettings();
  const updated = await SiteSettingsModel.findOneAndUpdate(
    { id: 1 },
    { $set: parsed.data },
    { new: true }
  ).lean();

  res.json(UpdateSiteSettingsResponse.parse(updated));
});

export default router;
