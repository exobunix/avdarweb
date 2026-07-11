import { Router, type IRouter } from "express";
import { ServiceModel } from "@workspace/db";
import {
  ListServicesResponse,
  CreateServiceBody,
  CreateServiceResponse,
  UpdateServiceParams,
  UpdateServiceBody,
  UpdateServiceResponse,
  DeleteServiceParams,
} from "@workspace/api-zod";
import { requireAdmin } from "../lib/auth";

const router: IRouter = Router();

router.get("/services", async (_req, res): Promise<void> => {
  const rows = await ServiceModel.find().sort({ order: 1, id: 1 }).lean();
  res.json(ListServicesResponse.parse(rows));
});

router.post("/services", requireAdmin, async (req, res): Promise<void> => {
  const parsed = CreateServiceBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const row = await ServiceModel.create(parsed.data);
  res.status(201).json(CreateServiceResponse.parse(row.toObject()));
});

router.patch("/services/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = UpdateServiceParams.safeParse(req.params);
  const body = UpdateServiceBody.safeParse(req.body);
  if (!params.success || !body.success) {
    res.status(400).json({ error: (params.error ?? body.error)?.message });
    return;
  }
  const row = await ServiceModel.findOneAndUpdate(
    { id: params.data.id },
    { $set: body.data },
    { new: true }
  ).lean();
  if (!row) {
    res.status(404).json({ error: "Service not found" });
    return;
  }
  res.json(UpdateServiceResponse.parse(row));
});

router.delete("/services/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = DeleteServiceParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const row = await ServiceModel.findOneAndDelete({ id: params.data.id }).lean();
  if (!row) {
    res.status(404).json({ error: "Service not found" });
    return;
  }
  res.status(204).send();
});

export default router;
