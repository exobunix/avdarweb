import { Router, type IRouter } from "express";
import { ProductModel } from "@workspace/db";
import {
  ListProductsResponse,
  CreateProductBody,
  CreateProductResponse,
  UpdateProductParams,
  UpdateProductBody,
  UpdateProductResponse,
  DeleteProductParams,
} from "@workspace/api-zod";
import { requireAdmin } from "../lib/auth";

const router: IRouter = Router();

router.get("/products", async (_req, res): Promise<void> => {
  const rows = await ProductModel.find().sort({ order: 1, id: 1 }).lean();
  res.json(ListProductsResponse.parse(rows));
});

router.post("/products", requireAdmin, async (req, res): Promise<void> => {
  const parsed = CreateProductBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const row = await ProductModel.create(parsed.data);
  res.status(201).json(CreateProductResponse.parse(row.toObject()));
});

router.patch("/products/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = UpdateProductParams.safeParse(req.params);
  const body = UpdateProductBody.safeParse(req.body);
  if (!params.success || !body.success) {
    res.status(400).json({ error: (params.error ?? body.error)?.message });
    return;
  }
  const row = await ProductModel.findOneAndUpdate(
    { id: params.data.id },
    { $set: body.data },
    { new: true }
  ).lean();
  if (!row) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  res.json(UpdateProductResponse.parse(row));
});

router.delete("/products/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = DeleteProductParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const row = await ProductModel.findOneAndDelete({ id: params.data.id }).lean();
  if (!row) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  res.status(204).send();
});

export default router;
