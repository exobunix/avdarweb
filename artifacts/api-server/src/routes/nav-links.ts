import { Router, type IRouter } from "express";
import { NavLinkModel } from "@workspace/db";
import {
  ListNavLinksResponse,
  CreateNavLinkBody,
  CreateNavLinkResponse,
  UpdateNavLinkParams,
  UpdateNavLinkBody,
  UpdateNavLinkResponse,
  DeleteNavLinkParams,
} from "@workspace/api-zod";
import { requireAdmin } from "../lib/auth";

const router: IRouter = Router();

router.get("/nav-links", async (_req, res): Promise<void> => {
  const rows = await NavLinkModel.find().sort({ order: 1, id: 1 }).lean();
  res.json(ListNavLinksResponse.parse(rows));
});

router.post("/nav-links", requireAdmin, async (req, res): Promise<void> => {
  const parsed = CreateNavLinkBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const row = await NavLinkModel.create(parsed.data);
  res.status(201).json(CreateNavLinkResponse.parse(row.toObject()));
});

router.patch("/nav-links/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = UpdateNavLinkParams.safeParse(req.params);
  const body = UpdateNavLinkBody.safeParse(req.body);
  if (!params.success || !body.success) {
    res.status(400).json({ error: (params.error ?? body.error)?.message });
    return;
  }
  const row = await NavLinkModel.findOneAndUpdate(
    { id: params.data.id },
    { $set: body.data },
    { new: true }
  ).lean();
  if (!row) {
    res.status(404).json({ error: "Nav link not found" });
    return;
  }
  res.json(UpdateNavLinkResponse.parse(row));
});

router.delete("/nav-links/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = DeleteNavLinkParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const row = await NavLinkModel.findOneAndDelete({ id: params.data.id }).lean();
  if (!row) {
    res.status(404).json({ error: "Nav link not found" });
    return;
  }
  res.status(204).send();
});

export default router;
