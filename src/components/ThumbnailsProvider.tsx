"use client";

import { createContext, useContext, type ReactNode } from "react";

// Map of project slug → thumbnail URL, found on the server by findProjectThumbnails() and handed to
// client components (the hero fan and dock cards are client-rendered).
const ThumbnailsContext = createContext<Record<string, string>>({});

export function ThumbnailsProvider({ thumbnails, children }: { thumbnails: Record<string, string>; children: ReactNode }) {
  return <ThumbnailsContext.Provider value={thumbnails}>{children}</ThumbnailsContext.Provider>;
}

export const useThumbnails = () => useContext(ThumbnailsContext);
