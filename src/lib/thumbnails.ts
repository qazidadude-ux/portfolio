import fs from "node:fs";
import path from "node:path";

const THUMBNAIL_DIR = path.join(process.cwd(), "public", "projects");
const IMAGE_FILE = /\.(jpe?g|png|webp|avif)$/i;

// Project thumbnails found by file name: public/projects/<slug>.<ext> (e.g. chowmill.jpg) becomes
// { chowmill: "/projects/chowmill.jpg" }. Lets thumbnails be added by dropping a file in, no code edits.
// Server-only (reads the file system).
export function findProjectThumbnails(): Record<string, string> {
  try {
    return Object.fromEntries(
      fs
        .readdirSync(THUMBNAIL_DIR)
        .filter((file) => IMAGE_FILE.test(file))
        .map((file) => [path.parse(file).name.toLowerCase(), `/projects/${file}`]),
    );
  } catch {
    return {};
  }
}
