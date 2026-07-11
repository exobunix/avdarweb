import { Router, type IRouter } from "express";
import { FooterLinkModel } from "@workspace/db";
import {
  ListFooterLinksResponse,
  CreateFooterLinkBody,
  CreateFooterLinkResponse,
  UpdateFooterLinkParams,
  UpdateFooterLinkBody,
  UpdateFooterLinkResponse,
  DeleteFooterLinkParams,
} from "@workspace/api-zod";
import { requireAdmin } from "../lib/auth";

const router: IRouter = Router();

router.get("/footer-links", async (_req, res): Promise<void> => {
  const rows = await FooterLinkModel.find().sort({ section: 1, order: 1, id: 1 }).lean();
  res.json(ListFooterLinksResponse.parse(rows));
});

router.post("/footer-links", requireAdmin, async (req, res): Promise<void> => {
  const parsed = CreateFooterLinkBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const row = await FooterLinkModel.create(parsed.data);
  res.status(201).json(CreateFooterLinkResponse.parse(row.toObject()));
});

router.patch("/footer-links/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = UpdateFooterLinkParams.safeParse(req.params);
  const body = UpdateFooterLinkBody.safeParse(req.body);
  if (!params.success || !body.success) {
    res.status(400).json({ error: (params.error ?? body.error)?.message });
    return;
  }
  const row = await FooterLinkModel.findOneAndUpdate(
    { id: params.data.id },
    { $set: body.data },
    { new: true }
  ).lean();
  if (!row) {
    res.status(404).json({ error: "Footer link not found" });
    return;
  }
  res.json(UpdateFooterLinkResponse.parse(row));
});

router.delete("/footer-links/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = DeleteFooterLinkParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const row = await FooterLinkModel.findOneAndDelete({ id: params.data.id }).lean();
  if (!row) {
    res.status(404).json({ error: "Footer link not found" });
    return;
  }
  res.status(204).send();
});

export default router;
