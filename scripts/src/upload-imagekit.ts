import fs from "fs";
import path from "path";

const PUBLIC_KEY = "public_5z+lOJYXBs7KgjxXI/ikiRBuaiA=";
const PRIVATE_KEY = "private_q34ikaQJf2j1Frf6WPMDoDJ+5cU=";
const URL_ENDPOINT = "https://ik.imagekit.io/smcdngw8m";

const assetsDir = path.resolve(import.meta.dirname, "../../artifacts/avdar-innovations/src/assets");

const filesToUpload = [
  { name: "avdar-logo.png", fileName: "avdar-logo.png" },
  { name: "avdar-video-1.mp4", fileName: "avdar-video-1.mp4" },
  { name: "avdar-video-2.mp4", fileName: "avdar-video-2.mp4" }
];

async function uploadFile(filePath: string, fileName: string) {
  const fileBuffer = fs.readFileSync(filePath);
  const blob = new Blob([fileBuffer]);

  const formData = new FormData();
  formData.append("file", blob, fileName);
  formData.append("fileName", fileName);
  formData.append("folder", "/avdarweb");

  const authHeader = "Basic " + Buffer.from(PRIVATE_KEY + ":").toString("base64");

  const res = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
    method: "POST",
    headers: {
      Authorization: authHeader
    },
    body: formData
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Upload failed for ${fileName}: ${res.statusText} - ${errText}`);
  }

  const data = await res.json() as any;
  return data.url;
}

async function main() {
  console.log("Starting uploads to ImageKit under /avdarweb...");
  for (const file of filesToUpload) {
    const fullPath = path.join(assetsDir, file.name);
    if (!fs.existsSync(fullPath)) {
      console.warn(`File not found: ${fullPath}`);
      continue;
    }
    console.log(`Uploading ${file.name}...`);
    try {
      const url = await uploadFile(fullPath, file.fileName);
      console.log(`Uploaded ${file.name} successfully! URL: ${url}`);
    } catch (err) {
      console.error(err);
    }
  }
}

main();
