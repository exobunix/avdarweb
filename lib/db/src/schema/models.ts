import { Schema, model } from "mongoose";
import { Counter } from "./counter";

// Reusable pre-save hook for auto-incrementing id
async function autoIncrementPreSave(this: any, next: any) {
  if (this.isNew && typeof this.id !== "number") {
    try {
      const counter = await Counter.findByIdAndUpdate(
        this.constructor.modelName,
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.id = counter?.seq ?? 1;
      next();
    } catch (err: any) {
      next(err);
    }
  } else {
    next();
  }
}

// 1. SiteSettings
export interface ISiteSettings {
  id: number;
  siteName: string;
  logoUrl: string;
  tagline: string;
  contactEmail: string;
  contactPhones: string[];
  contactAddress: string;
  mapEmbedUrl: string;
  socialLinks: { label: string; url: string }[];
  updatedAt: Date;
}

const SiteSettingsSchema = new Schema<ISiteSettings>({
  id: { type: Number, default: 1, unique: true },
  siteName: { type: String, default: "Avdar Innovations" },
  logoUrl: { type: String, default: "" },
  tagline: { type: String, default: "" },
  contactEmail: { type: String, default: "" },
  contactPhones: { type: [String], default: [] },
  contactAddress: { type: String, default: "" },
  mapEmbedUrl: { type: String, default: "" },
  socialLinks: {
    type: [{ label: String, url: String }],
    default: []
  },
  updatedAt: { type: Date, default: Date.now }
});

SiteSettingsSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export const SiteSettingsModel = model<ISiteSettings>("SiteSettings", SiteSettingsSchema);

// 2. ThemeSettings
export interface ThemeColors {
  background: string;
  foreground: string;
  primary: string;
  primaryForeground: string;
  accent: string;
  accentForeground: string;
  card: string;
  border: string;
  muted: string;
  mutedForeground: string;
}

export interface IThemeSettings {
  id: number;
  defaultMode: string;
  activePreset: string;
  headingFont: string;
  bodyFont: string;
  customLight: ThemeColors;
  customDark: ThemeColors;
  updatedAt: Date;
}

const ThemeColorsSchema = new Schema<ThemeColors>({
  background: String,
  foreground: String,
  primary: String,
  primaryForeground: String,
  accent: String,
  accentForeground: String,
  card: String,
  border: String,
  muted: String,
  mutedForeground: String
}, { _id: false });

const ThemeSettingsSchema = new Schema<IThemeSettings>({
  id: { type: Number, default: 1, unique: true },
  defaultMode: { type: String, default: "dark" },
  activePreset: { type: String, default: "nebula" },
  headingFont: { type: String, default: "Space Grotesk" },
  bodyFont: { type: String, default: "Inter" },
  customLight: {
    type: ThemeColorsSchema,
    default: {
      background: "0 0% 100%",
      foreground: "222 47% 11%",
      primary: "217 91% 60%",
      primaryForeground: "0 0% 100%",
      accent: "262 83% 58%",
      accentForeground: "0 0% 100%",
      card: "0 0% 100%",
      border: "220 13% 91%",
      muted: "220 14% 96%",
      mutedForeground: "220 9% 46%"
    }
  },
  customDark: {
    type: ThemeColorsSchema,
    default: {
      background: "222 47% 4%",
      foreground: "210 40% 98%",
      primary: "217 91% 60%",
      primaryForeground: "0 0% 100%",
      accent: "262 83% 58%",
      accentForeground: "0 0% 100%",
      card: "222 47% 7%",
      border: "217 33% 17%",
      muted: "217 33% 12%",
      mutedForeground: "215 20% 65%"
    }
  },
  updatedAt: { type: Date, default: Date.now }
});

ThemeSettingsSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export const ThemeSettingsModel = model<IThemeSettings>("ThemeSettings", ThemeSettingsSchema);

// 3. NavLink
export interface INavLink {
  id: number;
  label: string;
  href: string;
  order: number;
  createdAt: Date;
}

const NavLinkSchema = new Schema<INavLink>({
  id: { type: Number, unique: true },
  label: { type: String, required: true },
  href: { type: String, required: true },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

NavLinkSchema.pre("save", autoIncrementPreSave);

export const NavLinkModel = model<INavLink>("NavLink", NavLinkSchema);

// 4. FooterLink
export interface IFooterLink {
  id: number;
  section: string;
  label: string;
  href: string;
  order: number;
  createdAt: Date;
}

const FooterLinkSchema = new Schema<IFooterLink>({
  id: { type: Number, unique: true },
  section: { type: String, required: true },
  label: { type: String, required: true },
  href: { type: String, required: true },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

FooterLinkSchema.pre("save", autoIncrementPreSave);

export const FooterLinkModel = model<IFooterLink>("FooterLink", FooterLinkSchema);

// 5. Service
export interface IService {
  id: number;
  title: string;
  description: string;
  icon: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>({
  id: { type: Number, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: "Sparkles" },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

ServiceSchema.pre("save", function (this: any, next) {
  this.updatedAt = new Date();
  autoIncrementPreSave.call(this, next);
});

export const ServiceModel = model<IService>("Service", ServiceSchema);

// 6. Product
export interface IProduct {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  features: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  id: { type: Number, unique: true },
  title: { type: String, required: true },
  category: { type: String, default: "" },
  description: { type: String, required: true },
  image: { type: String, default: "" },
  features: { type: [String], default: [] },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

ProductSchema.pre("save", function (this: any, next) {
  this.updatedAt = new Date();
  autoIncrementPreSave.call(this, next);
});

export const ProductModel = model<IProduct>("Product", ProductSchema);

// 7. PortfolioProject
export interface IPortfolioProject {
  id: number;
  title: string;
  category: string;
  image: string;
  url: string;
  challenge: string;
  solution: string;
  tags: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const PortfolioProjectSchema = new Schema<IPortfolioProject>({
  id: { type: Number, unique: true },
  title: { type: String, required: true },
  category: { type: String, default: "" },
  image: { type: String, default: "" },
  url: { type: String, default: "" },
  challenge: { type: String, default: "" },
  solution: { type: String, default: "" },
  tags: { type: [String], default: [] },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

PortfolioProjectSchema.pre("save", function (this: any, next) {
  this.updatedAt = new Date();
  autoIncrementPreSave.call(this, next);
});

export const PortfolioProjectModel = model<IPortfolioProject>("PortfolioProject", PortfolioProjectSchema);

// 8. Industry
export interface IIndustry {
  id: number;
  title: string;
  description: string;
  icon: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const IndustrySchema = new Schema<IIndustry>({
  id: { type: Number, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: "Building2" },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

IndustrySchema.pre("save", function (this: any, next) {
  this.updatedAt = new Date();
  autoIncrementPreSave.call(this, next);
});

export const IndustryModel = model<IIndustry>("Industry", IndustrySchema);

// 9. BlogPost
export interface IBlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>({
  id: { type: Number, unique: true },
  title: { type: String, required: true },
  slug: { type: String, required: true },
  excerpt: { type: String, default: "" },
  content: { type: String, default: "" },
  image: { type: String, default: "" },
  author: { type: String, default: "" },
  category: { type: String, default: "" },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

BlogPostSchema.pre("save", function (this: any, next) {
  this.updatedAt = new Date();
  autoIncrementPreSave.call(this, next);
});

export const BlogPostModel = model<IBlogPost>("BlogPost", BlogPostSchema);

// 10. CareerRole
export interface ICareerRole {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const CareerRoleSchema = new Schema<ICareerRole>({
  id: { type: Number, unique: true },
  title: { type: String, required: true },
  department: { type: String, default: "" },
  location: { type: String, default: "" },
  type: { type: String, default: "Full-time" },
  description: { type: String, default: "" },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

CareerRoleSchema.pre("save", function (this: any, next) {
  this.updatedAt = new Date();
  autoIncrementPreSave.call(this, next);
});

export const CareerRoleModel = model<ICareerRole>("CareerRole", CareerRoleSchema);

// 11. PageContent
export interface IPageContent {
  id: number;
  page: string;
  key: string;
  value: Record<string, any>;
  updatedAt: Date;
}

const PageContentSchema = new Schema<IPageContent>({
  id: { type: Number, unique: true },
  page: { type: String, required: true },
  key: { type: String, required: true },
  value: { type: Schema.Types.Mixed, default: {} },
  updatedAt: { type: Date, default: Date.now }
});

PageContentSchema.index({ page: 1, key: 1 }, { unique: true });

PageContentSchema.pre("save", function (this: any, next) {
  this.updatedAt = new Date();
  autoIncrementPreSave.call(this, next);
});

export const PageContentModel = model<IPageContent>("PageContent", PageContentSchema);
