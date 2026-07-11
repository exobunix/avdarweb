import { Router, type IRouter } from "express";
import { IndustryModel } from "@workspace/db";
import {
  ListIndustriesResponse,
  CreateIndustryBody,
  CreateIndustryResponse,
  UpdateIndustryParams,
  UpdateIndustryBody,
  UpdateIndustryResponse,
  DeleteIndustryParams,
} from "@workspace/api-zod";
import { requireAdmin } from "../lib/auth";

const router: IRouter = Router();

router.get("/industries", async (_req, res): Promise<void> => {
  const rows = await IndustryModel.find().sort({ order: 1, id: 1 }).lean();
  res.json(ListIndustriesResponse.parse(rows));
});

router.post("/industries", requireAdmin, async (req, res): Promise<void> => {
  const parsed = CreateIndustryBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const row = await IndustryModel.create(parsed.data);
  res.status(201).json(CreateIndustryResponse.parse(row.toObject()));
});

router.patch("/industries/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = UpdateIndustryParams.safeParse(req.params);
  const body = UpdateIndustryBody.safeParse(req.body);
  if (!params.success || !body.success) {
    res.status(400).json({ error: (params.error ?? body.error)?.message });
    return;
  }
  const row = await IndustryModel.findOneAndUpdate(
    { id: params.data.id },
    { $set: body.data },
    { new: true }
  ).lean();
  if (!row) {
    res.status(404).json({ error: "Industry not found" });
    return;
  }
  res.json(UpdateIndustryResponse.parse(row));
});

router.delete("/industries/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = DeleteIndustryParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const row = await IndustryModel.findOneAndDelete({ id: params.data.id }).lean();
  if (!row) {
    res.status(404).json({ error: "Industry not found" });
    return;
  }
  res.status(204).send();
});

export default router;
