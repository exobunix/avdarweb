import { Router, type IRouter } from "express";
import { CareerRoleModel } from "@workspace/db";
import {
  ListCareerRolesResponse,
  CreateCareerRoleBody,
  CreateCareerRoleResponse,
  UpdateCareerRoleParams,
  UpdateCareerRoleBody,
  UpdateCareerRoleResponse,
  DeleteCareerRoleParams,
} from "@workspace/api-zod";
import { requireAdmin } from "../lib/auth";

const router: IRouter = Router();

router.get("/career-roles", async (_req, res): Promise<void> => {
  const rows = await CareerRoleModel.find().sort({ order: 1, id: 1 }).lean();
  res.json(ListCareerRolesResponse.parse(rows));
});

router.post("/career-roles", requireAdmin, async (req, res): Promise<void> => {
  const parsed = CreateCareerRoleBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const row = await CareerRoleModel.create(parsed.data);
  res.status(201).json(CreateCareerRoleResponse.parse(row.toObject()));
});

router.patch("/career-roles/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = UpdateCareerRoleParams.safeParse(req.params);
  const body = UpdateCareerRoleBody.safeParse(req.body);
  if (!params.success || !body.success) {
    res.status(400).json({ error: (params.error ?? body.error)?.message });
    return;
  }
  const row = await CareerRoleModel.findOneAndUpdate(
    { id: params.data.id },
    { $set: body.data },
    { new: true }
  ).lean();
  if (!row) {
    res.status(404).json({ error: "Career role not found" });
    return;
  }
  res.json(UpdateCareerRoleResponse.parse(row));
});

router.delete("/career-roles/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = DeleteCareerRoleParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const row = await CareerRoleModel.findOneAndDelete({ id: params.data.id }).lean();
  if (!row) {
    res.status(404).json({ error: "Career role not found" });
    return;
  }
  res.status(204).send();
});

export default router;
