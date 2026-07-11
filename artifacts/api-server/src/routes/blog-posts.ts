import { Router, type IRouter } from "express";
import { BlogPostModel } from "@workspace/db";
import {
  ListBlogPostsResponse,
  GetBlogPostParams,
  GetBlogPostResponse,
  CreateBlogPostBody,
  CreateBlogPostResponse,
  UpdateBlogPostParams,
  UpdateBlogPostBody,
  UpdateBlogPostResponse,
  DeleteBlogPostParams,
} from "@workspace/api-zod";
import { requireAdmin } from "../lib/auth";

const router: IRouter = Router();

router.get("/blog-posts", async (_req, res): Promise<void> => {
  const rows = await BlogPostModel.find().sort({ order: 1, id: 1 }).lean();
  res.json(ListBlogPostsResponse.parse(rows));
});

router.post("/blog-posts", requireAdmin, async (req, res): Promise<void> => {
  const parsed = CreateBlogPostBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const row = await BlogPostModel.create(parsed.data);
  res.status(201).json(CreateBlogPostResponse.parse(row.toObject()));
});

router.get("/blog-posts/:id", async (req, res): Promise<void> => {
  const params = GetBlogPostParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const row = await BlogPostModel.findOne({ id: params.data.id }).lean();
  if (!row) {
    res.status(404).json({ error: "Blog post not found" });
    return;
  }
  res.json(GetBlogPostResponse.parse(row));
});

router.patch("/blog-posts/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = UpdateBlogPostParams.safeParse(req.params);
  const body = UpdateBlogPostBody.safeParse(req.body);
  if (!params.success || !body.success) {
    res.status(400).json({ error: (params.error ?? body.error)?.message });
    return;
  }
  const row = await BlogPostModel.findOneAndUpdate(
    { id: params.data.id },
    { $set: body.data },
    { new: true }
  ).lean();
  if (!row) {
    res.status(404).json({ error: "Blog post not found" });
    return;
  }
  res.json(UpdateBlogPostResponse.parse(row));
});

router.delete("/blog-posts/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = DeleteBlogPostParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const row = await BlogPostModel.findOneAndDelete({ id: params.data.id }).lean();
  if (!row) {
    res.status(404).json({ error: "Blog post not found" });
    return;
  }
  res.status(204).send();
});

export default router;
