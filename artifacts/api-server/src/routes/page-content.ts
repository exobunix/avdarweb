import { Router, type IRouter } from "express";
import { PageContentModel } from "@workspace/db";
import {
  ListPageContentParams,
  ListPageContentResponse,
  UpsertPageContentBlockParams,
  UpsertPageContentBlockBody,
  UpsertPageContentBlockResponse,
} from "@workspace/api-zod";
import { requireAdmin } from "../lib/auth";

const router: IRouter = Router();

router.get("/page-content/:page", async (req, res): Promise<void> => {
  const params = ListPageContentParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const rows = await PageContentModel.find({ page: params.data.page }).lean();
  res.json(ListPageContentResponse.parse(rows));
});

router.put("/page-content/:page/:key", requireAdmin, async (req, res): Promise<void> => {
  const params = UpsertPageContentBlockParams.safeParse(req.params);
  const body = UpsertPageContentBlockBody.safeParse(req.body);
  if (!params.success || !body.success) {
    res.status(400).json({ error: (params.error ?? body.error)?.message });
    return;
  }

  const { page, key } = params.data;
  let doc = await PageContentModel.findOne({ page, key });
  if (doc) {
    doc.value = body.data.value;
    await doc.save();
  } else {
    doc = new PageContentModel({ page, key, value: body.data.value });
    await doc.save();
  }

  res.json(UpsertPageContentBlockResponse.parse(doc.toObject()));
});

export default router;
