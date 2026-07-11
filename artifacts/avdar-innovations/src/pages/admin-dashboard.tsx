import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import {
  useGetAdminSession,
  useAdminLogout,
  useGetSiteSettings,
  useUpdateSiteSettings,
  useGetThemeSettings,
  useUpdateThemeSettings,
  useListNavLinks,
  useCreateNavLink,
  useUpdateNavLink,
  useDeleteNavLink,
  useListFooterLinks,
  useCreateFooterLink,
  useUpdateFooterLink,
  useDeleteFooterLink,
  useListServices,
  useCreateService,
  useUpdateService,
  useDeleteService,
  useListProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
  useListPortfolioProjects,
  useCreatePortfolioProject,
  useUpdatePortfolioProject,
  useDeletePortfolioProject,
  useListIndustries,
  useCreateIndustry,
  useUpdateIndustry,
  useDeleteIndustry,
  useListBlogPosts,
  useCreateBlogPost,
  useUpdateBlogPost,
  useDeleteBlogPost,
  useListCareerRoles,
  useCreateCareerRole,
  useUpdateCareerRole,
  useDeleteCareerRole,
  useListPageContent,
  useUpsertPageContentBlock,
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  LayoutDashboard, Settings, Palette, Menu, FolderHeart, Briefcase, FileText, BookOpen, LogOut, Plus, Trash2, Edit2, Upload, ExternalLink, HelpCircle
} from "lucide-react";

// ImageKit Credentials
const IMAGEKIT_PUBLIC_KEY = "public_5z+lOJYXBs7KgjxXI/ikiRBuaiA=";
const IMAGEKIT_PRIVATE_KEY = "private_q34ikaQJf2j1Frf6WPMDoDJ+5cU=";

// Theme presets definition
const THEME_PRESETS = {
  nebula: {
    headingFont: "Outfit",
    bodyFont: "Plus Jakarta Sans",
    customDark: {
      background: "224 71% 4%",
      foreground: "213 31% 91%",
      primary: "199 89% 48%",
      primaryForeground: "0 0% 100%",
      accent: "24 95% 53%",
      accentForeground: "0 0% 100%",
      card: "224 71% 4%",
      border: "216 34% 17%",
      muted: "223 47% 11%",
      mutedForeground: "215.4 16.3% 56.9%"
    },
    customLight: {
      background: "210 40% 98%",
      foreground: "222.2 47.4% 11.2%",
      primary: "221.2 83.2% 53.3%",
      primaryForeground: "210 40% 98%",
      accent: "24.6 95% 53.1%",
      accentForeground: "210 40% 98%",
      card: "0 0% 100%",
      border: "214.3 31.8% 91.4%",
      muted: "210 40% 96.1%",
      mutedForeground: "215.4 16.3% 46.9%"
    }
  },
  cyberpunk: {
    headingFont: "Space Mono",
    bodyFont: "Space Mono",
    customDark: {
      background: "0 0% 4%",
      foreground: "60 30% 96%",
      primary: "343 90% 50%",
      primaryForeground: "0 0% 100%",
      accent: "48 96% 53%",
      accentForeground: "0 0% 0%",
      card: "0 0% 7%",
      border: "0 0% 15%",
      muted: "0 0% 10%",
      mutedForeground: "0 0% 64%"
    },
    customLight: {
      background: "48 96% 85%",
      foreground: "0 0% 7%",
      primary: "326 80% 50%",
      primaryForeground: "0 0% 100%",
      accent: "199 89% 48%",
      accentForeground: "0 0% 100%",
      card: "0 0% 100%",
      border: "48 96% 75%",
      muted: "48 96% 93%",
      mutedForeground: "0 0% 30%"
    }
  },
  forest: {
    headingFont: "Outfit",
    bodyFont: "Plus Jakarta Sans",
    customDark: {
      background: "162 47% 5%",
      foreground: "148 60% 95%",
      primary: "158 64% 52%",
      primaryForeground: "162 47% 5%",
      accent: "217 91% 60%",
      accentForeground: "0 0% 100%",
      card: "162 47% 5%",
      border: "162 47% 12%",
      muted: "162 47% 8%",
      mutedForeground: "148 30% 60%"
    },
    customLight: {
      background: "138 76% 97%",
      foreground: "162 47% 10%",
      primary: "162 76% 27%",
      primaryForeground: "138 76% 97%",
      accent: "221.2 83.2% 53.3%",
      accentForeground: "0 0% 100%",
      card: "0 0% 100%",
      border: "138 76% 90%",
      muted: "138 76% 94%",
      mutedForeground: "162 47% 35%"
    }
  },
  sunset: {
    headingFont: "Outfit",
    bodyFont: "Plus Jakarta Sans",
    customDark: {
      background: "240 10% 4%",
      foreground: "0 0% 98%",
      primary: "20.5 90.2% 48.2%",
      primaryForeground: "0 0% 100%",
      accent: "327 73% 53%",
      accentForeground: "0 0% 100%",
      card: "240 10% 6%",
      border: "240 5.9% 10%",
      muted: "240 5.9% 7%",
      mutedForeground: "240 3.8% 65%"
    },
    customLight: {
      background: "30 100% 97%",
      foreground: "240 10% 10%",
      primary: "24.6 95% 53.1%",
      primaryForeground: "30 100% 97%",
      accent: "327 73% 53%",
      accentForeground: "0 0% 100%",
      card: "0 0% 100%",
      border: "30 100% 90%",
      muted: "30 100% 95%",
      mutedForeground: "240 10% 40%"
    }
  },
  slate: {
    headingFont: "Outfit",
    bodyFont: "Plus Jakarta Sans",
    customDark: {
      background: "222.2 47.4% 11.2%",
      foreground: "210 40% 98%",
      primary: "217.2 91.2% 59.8%",
      primaryForeground: "222.2 47.4% 11.2%",
      accent: "142.1 76.2% 36.3%",
      accentForeground: "355.7 100% 97.3%",
      card: "222.2 47.4% 11.2%",
      border: "217.2 32.6% 17.5%",
      muted: "217.2 32.6% 15%",
      mutedForeground: "215.4 16.3% 56.9%"
    },
    customLight: {
      background: "0 0% 100%",
      foreground: "222.2 84% 4.9%",
      primary: "221.2 83.2% 53.3%",
      primaryForeground: "210 40% 98%",
      accent: "142.1 76.2% 36.3%",
      accentForeground: "355.7 100% 97.3%",
      card: "0 0% 100%",
      border: "214.3 31.8% 91.4%",
      muted: "210 40% 96.1%",
      mutedForeground: "215.4 16.3% 46.9%"
    }
  }
};

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("settings");
  const [uploading, setUploading] = useState(false);

  // Auth session check
  const { data: session, isLoading: sessionLoading, refetch: refetchSession } = useGetAdminSession();
  const logoutMutation = useAdminLogout();

  useEffect(() => {
    if (!sessionLoading && !session?.authenticated) {
      setLocation("/admin/login");
    }
  }, [session, sessionLoading, setLocation]);

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: async () => {
        toast({ title: "Logged Out", description: "Goodbye!" });
        await refetchSession();
        setLocation("/admin/login");
      }
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, onUrlUploaded: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    formData.append("folder", "/avdarweb");

    const authHeader = "Basic " + btoa(IMAGEKIT_PRIVATE_KEY + ":");

    try {
      const res = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
        method: "POST",
        headers: {
          Authorization: authHeader
        },
        body: formData
      });

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      onUrlUploaded(data.url);
      toast({ title: "Upload Success", description: `File uploaded to: ${data.url}` });
    } catch (err) {
      toast({
        title: "Upload Failed",
        description: "Could not upload image to ImageKit.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  if (sessionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (!session?.authenticated) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-card border-b lg:border-b-0 lg:border-r border-border p-6 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold tracking-tight text-foreground">Avdar Panel</h1>
          </div>
          <nav className="flex flex-col gap-1.5">
            {[
              { id: "settings", label: "Site Settings", icon: Settings },
              { id: "theme", label: "Theme Designer", icon: Palette },
              { id: "menus", label: "Navigation Menus", icon: Menu },
              { id: "services", label: "Services", icon: FolderHeart },
              { id: "products", label: "Products", icon: FolderHeart },
              { id: "portfolio", label: "Portfolio Projects", icon: FolderHeart },
              { id: "industries", label: "Industries", icon: FolderHeart },
              { id: "pages", label: "Pages Content", icon: FileText },
              { id: "blog", label: "Blog Posts", icon: BookOpen },
              { id: "careers", label: "Careers Portal", icon: Briefcase }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="pt-6 border-t border-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 w-full transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        {activeTab === "settings" && <SiteSettingsTab handleFileUpload={handleFileUpload} uploading={uploading} />}
        {activeTab === "theme" && <ThemeSettingsTab />}
        {activeTab === "menus" && <MenusTab />}
        {activeTab === "services" && <ServicesTab />}
        {activeTab === "products" && <ProductsTab />}
        {activeTab === "portfolio" && <PortfolioTab handleFileUpload={handleFileUpload} uploading={uploading} />}
        {activeTab === "industries" && <IndustriesTab />}
        {activeTab === "pages" && <PagesContentTab />}
        {activeTab === "blog" && <BlogPostsTab handleFileUpload={handleFileUpload} uploading={uploading} />}
        {activeTab === "careers" && <CareersTab />}
      </main>
    </div>
  );
}

/* ==========================================
   1. SITE SETTINGS TAB
   ========================================== */
function SiteSettingsTab({ handleFileUpload, uploading }: { handleFileUpload: any, uploading: boolean }) {
  const { toast } = useToast();
  const { data: settings, refetch } = useGetSiteSettings();
  const updateMutation = useUpdateSiteSettings();

  const [siteName, setSiteName] = useState("");
  const [tagline, setTagline] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhones, setContactPhones] = useState<string[]>([]);
  const [contactAddress, setContactAddress] = useState("");
  const [mapEmbedUrl, setMapEmbedUrl] = useState("");
  const [socialLinks, setSocialLinks] = useState<{ label: string; url: string }[]>([]);

  useEffect(() => {
    if (settings) {
      setSiteName(settings.siteName || "");
      setTagline(settings.tagline || "");
      setLogoUrl(settings.logoUrl || "");
      setContactEmail(settings.contactEmail || "");
      setContactPhones(settings.contactPhones || []);
      setContactAddress(settings.contactAddress || "");
      setMapEmbedUrl(settings.mapEmbedUrl || "");
      setSocialLinks(settings.socialLinks ? settings.socialLinks.map(link => ({ label: link.label, url: link.url })) : []);
    }
  }, [settings]);

  const handleSave = () => {
    updateMutation.mutate(
      {
        data: {
          siteName,
          tagline,
          logoUrl,
          contactEmail,
          contactPhones,
          contactAddress,
          mapEmbedUrl,
          socialLinks
        }
      },
      {
        onSuccess: () => {
          toast({ title: "Saved", description: "Site settings updated successfully." });
          refetch();
        }
      }
    );
  };

  if (!settings) return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Site Settings</h2>
        <p className="text-sm text-muted-foreground">Manage your brand, contact info, logo, and embedded maps.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Identity & Assets</CardTitle>
          <CardDescription>Logo, brand name, and tagline</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Site Name</Label>
              <Input value={siteName} onChange={(e) => setSiteName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Tagline</Label>
              <Input value={tagline} onChange={(e) => setTagline(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Logo Image</Label>
            <div className="flex gap-4 items-center">
              <Input value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} className="flex-1" />
              <div className="relative">
                <input
                  type="file"
                  id="logo-upload"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, setLogoUrl)}
                  disabled={uploading}
                />
                <Button asChild variant="outline" className="cursor-pointer" disabled={uploading}>
                  <label htmlFor="logo-upload">
                    <Upload className="w-4 h-4 mr-2" />
                    {uploading ? "Uploading..." : "Upload Logo"}
                  </label>
                </Button>
              </div>
            </div>
            {logoUrl && (
              <div className="mt-2 p-2 border border-border rounded-lg w-fit bg-muted">
                <img src={logoUrl} alt="Logo preview" className="h-10 object-contain" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Details</CardTitle>
          <CardDescription>Add addresses, emails, and phone contacts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Contact Email</Label>
              <Input value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Input value={contactAddress} onChange={(e) => setContactAddress(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Phone Numbers (comma separated)</Label>
            <Input
              value={contactPhones.join(", ")}
              onChange={(e) => setContactPhones(e.target.value.split(",").map((p) => p.trim()))}
            />
          </div>

          <div className="space-y-2">
            <Label>Google Maps Embed URL</Label>
            <Textarea value={mapEmbedUrl} onChange={(e) => setMapEmbedUrl(e.target.value)} rows={2} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Media Links</CardTitle>
          <CardDescription>List your profiles (e.g. LinkedIn, Twitter)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {socialLinks.map((link, idx) => (
            <div key={idx} className="flex gap-4 items-center">
              <Input
                placeholder="Platform (e.g., LinkedIn)"
                value={link.label}
                onChange={(e) => {
                  const updated = [...socialLinks];
                  updated[idx].label = e.target.value;
                  setSocialLinks(updated);
                }}
                className="w-1/3"
              />
              <Input
                placeholder="Profile URL"
                value={link.url}
                onChange={(e) => {
                  const updated = [...socialLinks];
                  updated[idx].url = e.target.value;
                  setSocialLinks(updated);
                }}
                className="flex-1"
              />
              <Button
                variant="destructive"
                onClick={() => setSocialLinks(socialLinks.filter((_, i) => i !== idx))}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button variant="outline" onClick={() => setSocialLinks([...socialLinks, { label: "", url: "" }])}>
            <Plus className="w-4 h-4 mr-2" />
            Add Social Link
          </Button>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="bg-primary text-primary-foreground font-semibold px-6">
        Save All Settings
      </Button>
    </div>
  );
}

/* ==========================================
   2. THEME CONFIGURATOR TAB
   ========================================== */
function ThemeSettingsTab() {
  const { toast } = useToast();
  const { data: theme, refetch } = useGetThemeSettings();
  const updateMutation = useUpdateThemeSettings();

  const [activePreset, setActivePreset] = useState("nebula");
  const [defaultMode, setDefaultMode] = useState<"dark" | "light">("dark");
  const [headingFont, setHeadingFont] = useState("Outfit");
  const [bodyFont, setBodyFont] = useState("Plus Jakarta Sans");

  // Custom colors state
  const [lightColors, setLightColors] = useState<any>({});
  const [darkColors, setDarkColors] = useState<any>({});

  useEffect(() => {
    if (theme) {
      setActivePreset(theme.activePreset || "nebula");
      setDefaultMode((theme.defaultMode as "dark" | "light") || "dark");
      setHeadingFont(theme.headingFont || "Outfit");
      setBodyFont(theme.bodyFont || "Plus Jakarta Sans");
      setLightColors(theme.customLight || {});
      setDarkColors(theme.customDark || {});
    }
  }, [theme]);

  const handlePresetSelect = (presetKey: string) => {
    setActivePreset(presetKey);
    const preset = (THEME_PRESETS as any)[presetKey];
    if (preset) {
      setHeadingFont(preset.headingFont);
      setBodyFont(preset.bodyFont);
      setLightColors({ ...preset.customLight });
      setDarkColors({ ...preset.customDark });
    }
  };

  const handleSave = () => {
    updateMutation.mutate(
      {
        data: {
          activePreset,
          defaultMode,
          headingFont,
          bodyFont,
          customLight: lightColors,
          customDark: darkColors
        }
      },
      {
        onSuccess: () => {
          toast({ title: "Theme Saved", description: "New theme variables loaded successfully." });
          refetch();
        }
      }
    );
  };

  // Convert HSL color from '224 71% 4%' format to hexadecimal for color-picker
  const hslToHex = (hslString: string): string => {
    if (!hslString) return "#000000";
    const parts = hslString.split(" ");
    if (parts.length < 3) return "#000000";
    const h = parseFloat(parts[0]);
    const s = parseFloat(parts[1].replace("%", "")) / 100;
    const l = parseFloat(parts[2].replace("%", "")) / 100;

    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  // Convert hex color to HSL string 'H S% L%'
  const hexToHsl = (hex: string): string => {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  };

  const ColorInput = ({ label, colorKey, isDark }: { label: string; colorKey: string; isDark: boolean }) => {
    const colors = isDark ? darkColors : lightColors;
    const setColors = isDark ? setDarkColors : setLightColors;
    const val = colors[colorKey] || "0 0% 0%";

    return (
      <div className="flex items-center justify-between p-2 border border-border rounded-lg bg-card/50">
        <div>
          <span className="text-xs font-semibold text-foreground block">{label}</span>
          <span className="text-[10px] text-muted-foreground">{val}</span>
        </div>
        <input
          type="color"
          value={hslToHex(val)}
          onChange={(e) => {
            const hex = e.target.value;
            const hsl = hexToHsl(hex);
            setColors({ ...colors, [colorKey]: hsl });
            setActivePreset("custom");
          }}
          className="w-8 h-8 rounded cursor-pointer border border-border"
        />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Theme Designer</h2>
        <p className="text-sm text-muted-foreground">Select theme presets or create your own custom light/dark color palette.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Presets & Default Mode</CardTitle>
          <CardDescription>Choose an existing palette preset and starting mode</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Theme Preset</Label>
              <Select value={activePreset} onValueChange={handlePresetSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Select preset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nebula">Nebula (Dark Blue / Light Blue)</SelectItem>
                  <SelectItem value="cyberpunk">Cyberpunk (Neon / Vibrant)</SelectItem>
                  <SelectItem value="forest">Forest (Emerald / Sage)</SelectItem>
                  <SelectItem value="sunset">Sunset (Orange / Warm Cream)</SelectItem>
                  <SelectItem value="slate">Slate (Classic Monochrome)</SelectItem>
                  <SelectItem value="custom">Custom Color Palette</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Default Theme Mode</Label>
              <Select value={defaultMode} onValueChange={(val: any) => setDefaultMode(val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dark">Dark Mode</SelectItem>
                  <SelectItem value="light">Light Mode</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Typography</CardTitle>
          <CardDescription>Choose heading and body fonts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Heading Font</Label>
              <Select value={headingFont} onValueChange={(val) => { setHeadingFont(val); setActivePreset("custom"); }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["Outfit", "Space Mono", "Space Grotesk", "Plus Jakarta Sans", "Inter", "Montserrat", "Playfair Display"].map((f) => (
                    <SelectItem key={f} value={f}>{f}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Body Font</Label>
              <Select value={bodyFont} onValueChange={(val) => { setBodyFont(val); setActivePreset("custom"); }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["Plus Jakarta Sans", "Inter", "Outfit", "Space Mono", "Roboto", "Montserrat"].map((f) => (
                    <SelectItem key={f} value={f}>{f}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LIGHT THEME PALETTE */}
        <Card>
          <CardHeader>
            <CardTitle>Light Theme Palette</CardTitle>
            <CardDescription>Configure colors for Light Mode</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <ColorInput label="Background" colorKey="background" isDark={false} />
            <ColorInput label="Foreground Text" colorKey="foreground" isDark={false} />
            <ColorInput label="Primary Accent" colorKey="primary" isDark={false} />
            <ColorInput label="Primary Foreground" colorKey="primaryForeground" isDark={false} />
            <ColorInput label="Accent Highlight" colorKey="accent" isDark={false} />
            <ColorInput label="Accent Foreground" colorKey="accentForeground" isDark={false} />
            <ColorInput label="Card/Box Background" colorKey="card" isDark={false} />
            <ColorInput label="Borders & Dividers" colorKey="border" isDark={false} />
            <ColorInput label="Muted Section bg" colorKey="muted" isDark={false} />
            <ColorInput label="Muted Text" colorKey="mutedForeground" isDark={false} />
          </CardContent>
        </Card>

        {/* DARK THEME PALETTE */}
        <Card>
          <CardHeader>
            <CardTitle>Dark Theme Palette</CardTitle>
            <CardDescription>Configure colors for Dark Mode</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <ColorInput label="Background" colorKey="background" isDark={true} />
            <ColorInput label="Foreground Text" colorKey="foreground" isDark={true} />
            <ColorInput label="Primary Accent" colorKey="primary" isDark={true} />
            <ColorInput label="Primary Foreground" colorKey="primaryForeground" isDark={true} />
            <ColorInput label="Accent Highlight" colorKey="accent" isDark={true} />
            <ColorInput label="Accent Foreground" colorKey="accentForeground" isDark={true} />
            <ColorInput label="Card/Box Background" colorKey="card" isDark={true} />
            <ColorInput label="Borders & Dividers" colorKey="border" isDark={true} />
            <ColorInput label="Muted Section bg" colorKey="muted" isDark={true} />
            <ColorInput label="Muted Text" colorKey="mutedForeground" isDark={true} />
          </CardContent>
        </Card>
      </div>

      <Button onClick={handleSave} className="bg-primary text-primary-foreground font-semibold px-6">
        Apply Theme
      </Button>
    </div>
  );
}

/* ==========================================
   3. NAVIGATION MENUS TAB
   ========================================== */
function MenusTab() {
  const { toast } = useToast();
  const { data: navLinks, refetch: refetchNav } = useListNavLinks();
  const { data: footerLinks, refetch: refetchFooter } = useListFooterLinks();

  const createNav = useCreateNavLink();
  const updateNav = useUpdateNavLink();
  const deleteNav = useDeleteNavLink();

  const createFooter = useCreateFooterLink();
  const updateFooter = useUpdateFooterLink();
  const deleteFooter = useDeleteFooterLink();

  // Create Form State
  const [navLabel, setNavLabel] = useState("");
  const [navHref, setNavHref] = useState("");
  const [navOrder, setNavOrder] = useState(0);

  const [footerLabel, setFooterLabel] = useState("");
  const [footerHref, setFooterHref] = useState("");
  const [footerSection, setFooterSection] = useState<"Company" | "Expertise">("Company");
  const [footerOrder, setFooterOrder] = useState(0);

  const handleCreateNav = () => {
    createNav.mutate(
      { data: { label: navLabel, href: navHref, order: navOrder } },
      {
        onSuccess: () => {
          toast({ title: "Success", description: "Header nav link added." });
          refetchNav();
          setNavLabel(""); setNavHref(""); setNavOrder(0);
        }
      }
    );
  };

  const handleDeleteNav = (id: number) => {
    deleteNav.mutate(
      { id },
      {
        onSuccess: () => {
          toast({ title: "Success", description: "Header nav link deleted." });
          refetchNav();
        }
      }
    );
  };

  const handleCreateFooter = () => {
    createFooter.mutate(
      { data: { label: footerLabel, href: footerHref, section: footerSection, order: footerOrder } },
      {
        onSuccess: () => {
          toast({ title: "Success", description: "Footer link added." });
          refetchFooter();
          setFooterLabel(""); setFooterHref(""); setFooterOrder(0);
        }
      }
    );
  };

  const handleDeleteFooter = (id: number) => {
    deleteFooter.mutate(
      { id },
      {
        onSuccess: () => {
          toast({ title: "Success", description: "Footer link deleted." });
          refetchFooter();
        }
      }
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Navigation Menus</h2>
        <p className="text-sm text-muted-foreground">Manage your header navbar items and footer column lists.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* HEADER LINKS */}
        <Card>
          <CardHeader>
            <CardTitle>Header Navbar Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <Input placeholder="Label (e.g. Services)" value={navLabel} onChange={(e) => setNavLabel(e.target.value)} />
              <Input placeholder="URL (e.g. /services)" value={navHref} onChange={(e) => setNavHref(e.target.value)} />
              <div className="flex gap-2">
                <Input type="number" placeholder="Order" value={navOrder} onChange={(e) => setNavOrder(Number(e.target.value))} />
                <Button onClick={handleCreateNav}>Add</Button>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Label</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {navLinks?.sort((a, b) => a.order - b.order).map((link) => (
                  <TableRow key={link.id}>
                    <TableCell className="font-medium">{link.label}</TableCell>
                    <TableCell>{link.href}</TableCell>
                    <TableCell>{link.order}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteNav(link.id)}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* FOOTER LINKS */}
        <Card>
          <CardHeader>
            <CardTitle>Footer Menu Columns</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Input placeholder="Label" value={footerLabel} onChange={(e) => setFooterLabel(e.target.value)} />
              <Input placeholder="URL" value={footerHref} onChange={(e) => setFooterHref(e.target.value)} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Select value={footerSection} onValueChange={(val: any) => setFooterSection(val)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Company">Company Column</SelectItem>
                  <SelectItem value="Expertise">Expertise Column</SelectItem>
                </SelectContent>
              </Select>
              <Input type="number" placeholder="Order" value={footerOrder} onChange={(e) => setFooterOrder(Number(e.target.value))} />
              <Button onClick={handleCreateFooter}>Add Link</Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Label</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Section</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {footerLinks?.sort((a, b) => a.order - b.order).map((link) => (
                  <TableRow key={link.id}>
                    <TableCell className="font-medium">{link.label}</TableCell>
                    <TableCell>{link.href}</TableCell>
                    <TableCell>{link.section}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteFooter(link.id)}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* ==========================================
   4. SERVICES TAB
   ========================================== */
function ServicesTab() {
  const { toast } = useToast();
  const { data: services, refetch } = useListServices();
  const createMutation = useCreateService();
  const updateMutation = useUpdateService();
  const deleteMutation = useDeleteService();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("Cpu");
  const [order, setOrder] = useState(0);

  const [editId, setEditId] = useState<number | null>(null);

  const handleSave = () => {
    const payload = { title, description, icon, order };
    if (editId !== null) {
      updateMutation.mutate(
        { id: editId, data: payload },
        {
          onSuccess: () => {
            toast({ title: "Updated", description: "Service updated successfully." });
            refetch();
            resetForm();
          }
        }
      );
    } else {
      createMutation.mutate(
        { data: payload },
        {
          onSuccess: () => {
            toast({ title: "Created", description: "Service added successfully." });
            refetch();
            resetForm();
          }
        }
      );
    }
  };

  const handleEdit = (s: any) => {
    setEditId(s.id);
    setTitle(s.title);
    setDescription(s.description);
    setIcon(s.icon || "Cpu");
    setOrder(s.order || 0);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(
      { id },
      {
        onSuccess: () => {
          toast({ title: "Deleted", description: "Service removed successfully." });
          refetch();
        }
      }
    );
  };

  const resetForm = () => {
    setEditId(null);
    setTitle("");
    setDescription("");
    setIcon("Cpu");
    setOrder(0);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Services</h2>
        <p className="text-sm text-muted-foreground">Manage the services displayed on your Services page.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{editId !== null ? "Edit Service" : "Add New Service"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Service Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Lucide Icon Name</Label>
              <Input value={icon} onChange={(e) => setIcon(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Display Order</Label>
              <Input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave}>{editId !== null ? "Update Service" : "Create Service"}</Button>
            {editId !== null && <Button variant="outline" onClick={resetForm}>Cancel</Button>}
          </div>
        </CardContent>
      </Card>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Icon</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Order</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services?.sort((a, b) => a.order - b.order).map((s) => (
            <TableRow key={s.id}>
              <TableCell className="font-semibold">{s.icon}</TableCell>
              <TableCell className="font-semibold">{s.title}</TableCell>
              <TableCell className="max-w-md truncate">{s.description}</TableCell>
              <TableCell>{s.order}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(s)}>
                  <Edit2 className="w-3.5 h-3.5" />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(s.id)}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

/* ==========================================
   5. PRODUCTS TAB
   ========================================== */
function ProductsTab() {
  const { toast } = useToast();
  const { data: products, refetch } = useListProducts();
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [href, setHref] = useState("");
  const [order, setOrder] = useState(0);

  const [editId, setEditId] = useState<number | null>(null);

  const handleSave = () => {
    const payload = {
      title: name,
      category: href,
      description,
      image: "",
      features: [],
      order
    };
    if (editId !== null) {
      updateMutation.mutate(
        { id: editId, data: payload as any },
        {
          onSuccess: () => {
            toast({ title: "Updated", description: "Product updated successfully." });
            refetch();
            resetForm();
          }
        }
      );
    } else {
      createMutation.mutate(
        { data: payload as any },
        {
          onSuccess: () => {
            toast({ title: "Created", description: "Product added successfully." });
            refetch();
            resetForm();
          }
        }
      );
    }
  };

  const handleEdit = (p: any) => {
    setEditId(p.id);
    setName(p.title || "");
    setDescription(p.description || "");
    setHref(p.category || "");
    setOrder(p.order || 0);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(
      { id },
      {
        onSuccess: () => {
          toast({ title: "Deleted", description: "Product removed." });
          refetch();
        }
      }
    );
  };

  const resetForm = () => {
    setEditId(null);
    setName("");
    setDescription("");
    setHref("");
    setOrder(0);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Products</h2>
        <p className="text-sm text-muted-foreground">Manage your custom products or software solutions.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{editId !== null ? "Edit Product" : "Add Product"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Product Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Action URL / Link</Label>
              <Input value={href} onChange={(e) => setHref(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Display Order</Label>
              <Input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave}>{editId !== null ? "Update Product" : "Create Product"}</Button>
            {editId !== null && <Button variant="outline" onClick={resetForm}>Cancel</Button>}
          </div>
        </CardContent>
      </Card>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Link</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.sort((a, b) => a.order - b.order).map((p) => (
            <TableRow key={p.id}>
              <TableCell className="font-semibold">{p.title}</TableCell>
              <TableCell className="max-w-md truncate">{p.description}</TableCell>
              <TableCell>{p.category}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(p)}>
                  <Edit2 className="w-3.5 h-3.5" />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(p.id)}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

/* ==========================================
   6. PORTFOLIO PROJECTS TAB
   ========================================== */
function PortfolioTab({ handleFileUpload, uploading }: { handleFileUpload: any, uploading: boolean }) {
  const { toast } = useToast();
  const { data: projects, refetch } = useListPortfolioProjects();
  const createMutation = useCreatePortfolioProject();
  const updateMutation = useUpdatePortfolioProject();
  const deleteMutation = useDeletePortfolioProject();

  const [title, setTitle] = useState("");
  const [client, setClient] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [results, setResults] = useState("");
  const [order, setOrder] = useState(0);

  const [editId, setEditId] = useState<number | null>(null);

  const handleSave = () => {
    const payload = {
      title,
      url: client,
      category,
      image,
      challenge: "Operational efficiency, legacy structures, and automation gaps.",
      solution: description,
      tags: results.split(",").map((r) => r.trim()).filter(Boolean),
      order
    };

    if (editId !== null) {
      updateMutation.mutate(
        { id: editId, data: payload as any },
        {
          onSuccess: () => {
            toast({ title: "Updated", description: "Portfolio case study updated." });
            refetch();
            resetForm();
          }
        }
      );
    } else {
      createMutation.mutate(
        { data: payload as any },
        {
          onSuccess: () => {
            toast({ title: "Created", description: "Portfolio case study created." });
            refetch();
            resetForm();
          }
        }
      );
    }
  };

  const handleEdit = (p: any) => {
    setEditId(p.id);
    setTitle(p.title);
    setClient(p.url || "");
    setCategory(p.category || "");
    setImage(p.image || "");
    setDescription(p.solution || "");
    setResults(p.tags ? p.tags.join(", ") : "");
    setOrder(p.order || 0);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(
      { id },
      {
        onSuccess: () => {
          toast({ title: "Deleted", description: "Portfolio case study deleted." });
          refetch();
        }
      }
    );
  };

  const resetForm = () => {
    setEditId(null);
    setTitle("");
    setClient("");
    setCategory("");
    setImage("");
    setDescription("");
    setResults("");
    setOrder(0);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Portfolio Projects</h2>
        <p className="text-sm text-muted-foreground">Manage case studies and projects shown in the portfolio.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{editId !== null ? "Edit Project" : "Add Case Study"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Project Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Client Name</Label>
              <Input value={client} onChange={(e) => setClient(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Category (e.g. Enterprise AI)</Label>
              <Input value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Project Image (ImageKit URL)</Label>
            <div className="flex gap-4 items-center">
              <Input value={image} onChange={(e) => setImage(e.target.value)} className="flex-1" />
              <div className="relative">
                <input
                  type="file"
                  id="portfolio-upload"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, setImage)}
                  disabled={uploading}
                />
                <Button asChild variant="outline" className="cursor-pointer" disabled={uploading}>
                  <label htmlFor="portfolio-upload">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                  </label>
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Metrics & Results (comma separated, e.g. '90% Accuracy, 4x ROI')</Label>
              <Input value={results} onChange={(e) => setResults(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Display Order</Label>
              <Input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave}>{editId !== null ? "Update Case Study" : "Create Case Study"}</Button>
            {editId !== null && <Button variant="outline" onClick={resetForm}>Cancel</Button>}
          </div>
        </CardContent>
      </Card>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Client / Category</TableHead>
            <TableHead>Results</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects?.sort((a, b) => a.order - b.order).map((p) => (
            <TableRow key={p.id}>
              <TableCell>
                <img src={p.image} className="w-12 h-8 object-cover rounded border" />
              </TableCell>
              <TableCell className="font-semibold">{p.title}</TableCell>
              <TableCell>
                <span className="block text-sm">{p.url}</span>
                <span className="text-xs text-muted-foreground">{p.category}</span>
              </TableCell>
              <TableCell className="max-w-[200px] truncate">
                {p.tags ? p.tags.join(" | ") : "-"}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(p)}>
                  <Edit2 className="w-3.5 h-3.5" />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(p.id)}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

/* ==========================================
   7. INDUSTRIES TAB
   ========================================== */
function IndustriesTab() {
  const { toast } = useToast();
  const { data: industries, refetch } = useListIndustries();
  const createMutation = useCreateIndustry();
  const updateMutation = useUpdateIndustry();
  const deleteMutation = useDeleteIndustry();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("Factory");
  const [order, setOrder] = useState(0);

  const [editId, setEditId] = useState<number | null>(null);

  const handleSave = () => {
    const payload = { title: name, description, icon, order };
    if (editId !== null) {
      updateMutation.mutate(
        { id: editId, data: payload as any },
        {
          onSuccess: () => {
            toast({ title: "Updated", description: "Industry updated successfully." });
            refetch();
            resetForm();
          }
        }
      );
    } else {
      createMutation.mutate(
        { data: payload as any },
        {
          onSuccess: () => {
            toast({ title: "Created", description: "Industry added successfully." });
            refetch();
            resetForm();
          }
        }
      );
    }
  };

  const handleEdit = (ind: any) => {
    setEditId(ind.id);
    setName(ind.title || "");
    setDescription(ind.description);
    setIcon(ind.icon || "Factory");
    setOrder(ind.order || 0);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(
      { id },
      {
        onSuccess: () => {
          toast({ title: "Deleted", description: "Industry removed." });
          refetch();
        }
      }
    );
  };

  const resetForm = () => {
    setEditId(null);
    setName("");
    setDescription("");
    setIcon("Factory");
    setOrder(0);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Industries We Serve</h2>
        <p className="text-sm text-muted-foreground">Manage the sectors and industries highlighted on the Industries page.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{editId !== null ? "Edit Industry" : "Add Industry"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Industry Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Lucide Icon Name</Label>
              <Input value={icon} onChange={(e) => setIcon(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Display Order</Label>
              <Input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave}>{editId !== null ? "Update Industry" : "Create Industry"}</Button>
            {editId !== null && <Button variant="outline" onClick={resetForm}>Cancel</Button>}
          </div>
        </CardContent>
      </Card>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Icon</TableHead>
            <TableHead>Sector Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Order</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {industries?.sort((a, b) => a.order - b.order).map((ind) => (
            <TableRow key={ind.id}>
              <TableCell className="font-semibold">{ind.icon}</TableCell>
              <TableCell className="font-semibold">{ind.title}</TableCell>
              <TableCell className="max-w-md truncate">{ind.description}</TableCell>
              <TableCell>{ind.order}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(ind)}>
                  <Edit2 className="w-3.5 h-3.5" />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(ind.id)}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

/* ==========================================
   8. PAGES CMS CONTENT TAB
   ========================================== */
function PagesContentTab() {
  const { toast } = useToast();
  const [selectedPage, setSelectedPage] = useState("home");
  const { data: blocks, refetch } = useListPageContent(selectedPage);
  const upsertMutation = useUpsertPageContentBlock();

  const [activeBlockKey, setActiveBlockKey] = useState<string | null>(null);
  const [blockFields, setBlockFields] = useState<any>({});

  // Triggered when selectedPage or blocks change
  useEffect(() => {
    setActiveBlockKey(null);
    setBlockFields({});
  }, [selectedPage, blocks]);

  const handleEditBlock = (block: any) => {
    setActiveBlockKey(block.key);
    setBlockFields({ ...block.value });
  };

  const handleSaveBlock = () => {
    if (!activeBlockKey) return;
    upsertMutation.mutate(
      {
        page: selectedPage,
        key: activeBlockKey,
        data: { value: blockFields }
      },
      {
        onSuccess: () => {
          toast({ title: "Block Updated", description: `Updated content block ${activeBlockKey} successfully.` });
          refetch();
          setActiveBlockKey(null);
          setBlockFields({});
        }
      }
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Pages Content</h2>
          <p className="text-sm text-muted-foreground">Edit specific text blocks, titles, and descriptions dynamically per page.</p>
        </div>
        <Select value={selectedPage} onValueChange={(val) => setSelectedPage(val)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="home">Home Page</SelectItem>
            <SelectItem value="about">About Page</SelectItem>
            <SelectItem value="founder">Founder Page</SelectItem>
            <SelectItem value="careers">Careers Info</SelectItem>
            <SelectItem value="contact">Contact Details</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* BLOCKS LIST */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Blocks</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {blocks?.map((block) => (
                <button
                  key={block.key}
                  onClick={() => handleEditBlock(block)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition-all border ${
                    activeBlockKey === block.key
                      ? "bg-primary/10 border-primary text-primary"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  <span className="block capitalize font-bold">{block.key.replace(/-/g, " ")}</span>
                  <span className="block text-[10px] text-muted-foreground truncate">
                    {Object.values(block.value || {}).join(" | ")}
                  </span>
                </button>
              ))}
              {(!blocks || blocks.length === 0) && (
                <p className="text-sm text-muted-foreground text-center py-4">No content blocks configured for this page yet.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* EDITOR */}
        <div className="lg:col-span-2">
          {activeBlockKey ? (
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">Edit {activeBlockKey.replace(/-/g, " ")}</CardTitle>
                <CardDescription>Update values inside this page block</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.keys(blockFields).map((fieldKey) => (
                  <div key={fieldKey} className="space-y-2">
                    <Label className="capitalize">{fieldKey.replace(/([A-Z])/g, " $1")}</Label>
                    {typeof blockFields[fieldKey] === "string" && blockFields[fieldKey].length > 60 ? (
                      <Textarea
                        value={blockFields[fieldKey]}
                        onChange={(e) => setBlockFields({ ...blockFields, [fieldKey]: e.target.value })}
                        rows={4}
                      />
                    ) : (
                      <Input
                        type="text"
                        value={blockFields[fieldKey]}
                        onChange={(e) => setBlockFields({ ...blockFields, [fieldKey]: e.target.value })}
                      />
                    )}
                  </div>
                ))}
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button onClick={handleSaveBlock}>Save Block</Button>
                <Button variant="outline" onClick={() => { setActiveBlockKey(null); setBlockFields({}); }}>Cancel</Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed">
              <HelpCircle className="w-12 h-12 text-muted-foreground/50 mb-3" />
              <CardTitle className="text-lg">No Block Selected</CardTitle>
              <CardDescription>Select a block from the left panel to edit its details dynamically.</CardDescription>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

/* ==========================================
   9. BLOG POSTS TAB
   ========================================== */
function BlogPostsTab({ handleFileUpload, uploading }: { handleFileUpload: any, uploading: boolean }) {
  const { toast } = useToast();
  const { data: blogs, refetch } = useListBlogPosts();
  const createMutation = useCreateBlogPost();
  const updateMutation = useUpdateBlogPost();
  const deleteMutation = useDeleteBlogPost();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Insights");
  const [author, setAuthor] = useState("Adarsh Deep Sachan");
  const [image, setImage] = useState("");
  const [publishedAt, setPublishedAt] = useState("");

  const [editId, setEditId] = useState<number | null>(null);

  const handleSave = () => {
    // Generate slug from title
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const payload = {
      slug,
      title,
      excerpt,
      content,
      category,
      author,
      image,
      publishedAt: publishedAt || new Date().toISOString()
    };

    if (editId !== null) {
      updateMutation.mutate(
        { id: editId, data: payload },
        {
          onSuccess: () => {
            toast({ title: "Updated", description: "Blog article updated." });
            refetch();
            resetForm();
          }
        }
      );
    } else {
      createMutation.mutate(
        { data: payload },
        {
          onSuccess: () => {
            toast({ title: "Created", description: "Blog article posted." });
            refetch();
            resetForm();
          }
        }
      );
    }
  };

  const handleEdit = (b: any) => {
    setEditId(b.id);
    setTitle(b.title);
    setExcerpt(b.excerpt);
    setContent(b.content);
    setCategory(b.category);
    setAuthor(b.author);
    setImage(b.image);
    setPublishedAt(b.publishedAt ? b.publishedAt.split("T")[0] : "");
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(
      { id },
      {
        onSuccess: () => {
          toast({ title: "Deleted", description: "Blog article removed." });
          refetch();
        }
      }
    );
  };

  const resetForm = () => {
    setEditId(null);
    setTitle("");
    setExcerpt("");
    setContent("");
    setCategory("Insights");
    setAuthor("Adarsh Deep Sachan");
    setImage("");
    setPublishedAt("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Blog Articles</h2>
        <p className="text-sm text-muted-foreground">Manage your articles, announcements, and tech insights.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{editId !== null ? "Edit Article" : "Create Blog Article"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Article Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Input value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Author</Label>
              <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Feature Image (ImageKit URL)</Label>
              <div className="flex gap-4 items-center">
                <Input value={image} onChange={(e) => setImage(e.target.value)} className="flex-1" />
                <div className="relative">
                  <input
                    type="file"
                    id="blog-upload"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, setImage)}
                    disabled={uploading}
                  />
                  <Button asChild variant="outline" className="cursor-pointer" disabled={uploading}>
                    <label htmlFor="blog-upload">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Banner
                    </label>
                  </Button>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Publish Date</Label>
              <Input type="date" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Short Excerpt</Label>
            <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} />
          </div>

          <div className="space-y-2">
            <Label>Full Article Content (Markdown supported)</Label>
            <Textarea value={content} onChange={(e) => setContent(e.target.value)} rows={10} className="font-mono text-sm" />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave}>{editId !== null ? "Update Post" : "Publish Post"}</Button>
            {editId !== null && <Button variant="outline" onClick={resetForm}>Cancel</Button>}
          </div>
        </CardContent>
      </Card>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Banner</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category / Author</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs?.map((b) => (
            <TableRow key={b.id}>
              <TableCell>
                <img src={b.image} className="w-12 h-8 object-cover rounded border" />
              </TableCell>
              <TableCell className="font-semibold">{b.title}</TableCell>
              <TableCell>
                <span className="block text-sm">{b.category}</span>
                <span className="text-xs text-muted-foreground">By {b.author}</span>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(b)}>
                  <Edit2 className="w-3.5 h-3.5" />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(b.id)}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

/* ==========================================
   10. CAREERS TAB
   ========================================== */
function CareersTab() {
  const { toast } = useToast();
  const { data: roles, refetch } = useListCareerRoles();
  const createMutation = useCreateCareerRole();
  const updateMutation = useUpdateCareerRole();
  const deleteMutation = useDeleteCareerRole();

  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("Engineering");
  const [location, setLocation] = useState("Remote / Noida, India");
  const [type, setType] = useState("Full-time");
  const [description, setDescription] = useState("");
  const [order, setOrder] = useState(0);

  const [editId, setEditId] = useState<number | null>(null);

  const handleSave = () => {
    const payload = { title, department, location, type, description, order };
    if (editId !== null) {
      updateMutation.mutate(
        { id: editId, data: payload },
        {
          onSuccess: () => {
            toast({ title: "Updated", description: "Job profile updated." });
            refetch();
            resetForm();
          }
        }
      );
    } else {
      createMutation.mutate(
        { data: payload },
        {
          onSuccess: () => {
            toast({ title: "Created", description: "Job profile posted." });
            refetch();
            resetForm();
          }
        }
      );
    }
  };

  const handleEdit = (r: any) => {
    setEditId(r.id);
    setTitle(r.title);
    setDepartment(r.department);
    setLocation(r.location);
    setType(r.type);
    setDescription(r.description);
    setOrder(r.order || 0);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(
      { id },
      {
        onSuccess: () => {
          toast({ title: "Deleted", description: "Job profile removed." });
          refetch();
        }
      }
    );
  };

  const resetForm = () => {
    setEditId(null);
    setTitle("");
    setDepartment("Engineering");
    setLocation("Remote / Noida, India");
    setType("Full-time");
    setDescription("");
    setOrder(0);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Careers</h2>
        <p className="text-sm text-muted-foreground">Post open jobs, requirements, and manage the Careers section.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{editId !== null ? "Edit Job Posting" : "Post New Job"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Job Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Department</Label>
              <Input value={department} onChange={(e) => setDepartment(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Employment Type (e.g. Full-time, Internship)</Label>
              <Input value={type} onChange={(e) => setType(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Display Order</Label>
              <Input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description / Requirements</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={6} />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave}>{editId !== null ? "Update Posting" : "Post Job"}</Button>
            {editId !== null && <Button variant="outline" onClick={resetForm}>Cancel</Button>}
          </div>
        </CardContent>
      </Card>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job Title</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Location / Type</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles?.sort((a, b) => a.order - b.order).map((r) => (
            <TableRow key={r.id}>
              <TableCell className="font-semibold">{r.title}</TableCell>
              <TableCell>{r.department}</TableCell>
              <TableCell>
                <span className="block text-sm">{r.location}</span>
                <span className="text-xs text-muted-foreground">{r.type}</span>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(r)}>
                  <Edit2 className="w-3.5 h-3.5" />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(r.id)}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
