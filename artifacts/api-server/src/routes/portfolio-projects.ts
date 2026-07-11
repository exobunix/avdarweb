import { Router, type IRouter } from "express";
import { PortfolioProjectModel } from "@workspace/db";
import {
  ListPortfolioProjectsResponse,
  CreatePortfolioProjectBody,
  CreatePortfolioProjectResponse,
  UpdatePortfolioProjectParams,
  UpdatePortfolioProjectBody,
  UpdatePortfolioProjectResponse,
  DeletePortfolioProjectParams,
} from "@workspace/api-zod";
import { requireAdmin } from "../lib/auth";

const router: IRouter = Router();

router.get("/portfolio-projects", async (_req, res): Promise<void> => {
  const rows = await PortfolioProjectModel.find().sort({ order: 1, id: 1 }).lean();
  res.json(ListPortfolioProjectsResponse.parse(rows));
});

router.post("/portfolio-projects", requireAdmin, async (req, res): Promise<void> => {
  const parsed = CreatePortfolioProjectBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const row = await PortfolioProjectModel.create(parsed.data);
  res.status(201).json(CreatePortfolioProjectResponse.parse(row.toObject()));
});

router.patch("/portfolio-projects/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = UpdatePortfolioProjectParams.safeParse(req.params);
  const body = UpdatePortfolioProjectBody.safeParse(req.body);
  if (!params.success || !body.success) {
    res.status(400).json({ error: (params.error ?? body.error)?.message });
    return;
  }
  const row = await PortfolioProjectModel.findOneAndUpdate(
    { id: params.data.id },
    { $set: body.data },
    { new: true }
  ).lean();
  if (!row) {
    res.status(404).json({ error: "Portfolio project not found" });
    return;
  }
  res.json(UpdatePortfolioProjectResponse.parse(row));
});

router.delete("/portfolio-projects/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = DeletePortfolioProjectParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const row = await PortfolioProjectModel.findOneAndDelete({ id: params.data.id }).lean();
  if (!row) {
    res.status(404).json({ error: "Portfolio project not found" });
    return;
  }
  res.status(204).send();
});

export default router;
