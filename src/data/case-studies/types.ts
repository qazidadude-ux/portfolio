// Shapes for long-form case study content (see ./index.ts for the registry and one file per
// project). Images live in public/projects/<slug>/; width/height are the files' real pixel sizes.

export type CaseImage = { src: string; width: number; height: number; alt: string };

export type CaseBlock =
  // Body copy and lists sit in the right-hand column beside the section title.
  | { type: "text"; text: string }
  | { type: "list"; items: readonly string[] }
  | { type: "quote"; text: string }
  // These span the full content width below the title row.
  // `scale` shows the image at a fraction of the content width, centered.
  | { type: "image"; image: CaseImage; narrow?: boolean; scale?: number }
  | { type: "listWithImage"; title?: string; items: readonly string[]; image: CaseImage }
  | { type: "cards"; items: readonly { title: string; text: string }[] }
  // One image per row; `narrow` caps the width (for very tall images).
  | { type: "gallery"; label: string; images: readonly CaseImage[]; narrow?: boolean }
  | { type: "metrics"; items: readonly { label: string; before: string; after: string }[] }
  // Big-number cards, e.g. "65%" over a label and an optional explanation.
  | { type: "stats"; items: readonly { value: string; label: string; text?: string }[] }
  // Feature-by-competitor table of strengths and weaknesses. The column at `highlight` (the
  // project itself) is set apart with green/red boxes.
  | {
      type: "comparison";
      columns: readonly string[];
      highlight: number;
      rows: readonly { feature: string; cells: readonly { strength: string; weakness: string }[] }[];
    }
  // Plain table: `columns` are the headers; the first cell of each row is its (bold) row header.
  | { type: "table"; columns: readonly string[]; rows: readonly (readonly string[])[] }
  // Empathy map: one row per quadrant (say / do / think / feel), its notes as tinted sticky cards.
  | {
      type: "empathy";
      rows: readonly { title: string; tone: "green" | "yellow" | "blue" | "purple"; items: readonly string[] }[];
    }
  // Persona card: round photo and name over a label/value list (age, occupation, …).
  | {
      type: "persona";
      title?: string;
      name: string;
      photo: CaseImage;
      fields: readonly { label: string; value: string }[];
    }
  // Titled lists side by side in cards, e.g. questions per user type or an empathy map.
  | { type: "groups"; items: readonly { title: string; items: readonly string[] }[] }
  // A titled sub-part of a section: optional paragraphs, quotes, a bullet list and images
  // (one per row; `narrow` for tall screens, `phone` lays phone screenshots out side by side).
  | {
      type: "sub";
      /** Sit 12px under the previous block, as if part of the same card grid. */
      tight?: boolean;
      title?: string;
      text?: readonly string[];
      quotes?: readonly string[];
      items?: readonly string[];
      images?: readonly CaseImage[];
      narrow?: boolean;
      phone?: boolean;
    };

export type CaseSection = {
  id: string;
  /** A "\n" in the title starts a new line. */
  title: string;
  /** Small label above the title, e.g. the phase a section belongs to. */
  eyebrow?: string;
  blocks: readonly CaseBlock[];
};

export type CaseStudy = {
  meta: readonly { label: string; value: string }[];
  impact: string;
  cover: CaseImage;
  /** Desktop gap (px) between a sub-part's title/text and its images; 48 when unset. */
  subImageGap?: number;
  /** Desktop gap (px) between a sub-part's title/text and its numbered cards; 12 when unset. */
  subCardsGap?: number;
  sections: readonly CaseSection[];
};

/** The double diamond design process diagram, shared by every case study that shows it. */
export const DESIGN_PROCESS: CaseImage = {
  src: "/projects/design-process.webp",
  width: 2400,
  height: 1320,
  alt: "Double diamond design process: discover, define, develop, deliver",
};

/** Image helper bound to a project's folder: img("cover.png", 1520, 927, "alt"). */
export const imagesFor =
  (slug: string) =>
  (file: string, width: number, height: number, alt: string): CaseImage => ({
    src: `/projects/${slug}/${file}`,
    width,
    height,
    alt,
  });
