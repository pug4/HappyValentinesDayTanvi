import { NextResponse } from "next/server";
import { readdir } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const mediaDir = path.join(process.cwd(), "public", "media");
    const files = await readdir(mediaDir);
    
    // Filter for image files only
    const imageExtensions = [".jpeg", ".jpg", ".png", ".gif", ".webp"];
    const photos = files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return imageExtensions.includes(ext) && !file.startsWith(".");
    });

    return NextResponse.json({ photos });
  } catch (error) {
    console.error("Error reading photos:", error);
    return NextResponse.json({ photos: [] });
  }
}
