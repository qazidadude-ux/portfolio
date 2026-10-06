// Long-form case study content, keyed by project slug. A project with an entry here gets the
// case study layout on /projects/<slug>; the rest fall back to the simple overview page.
import type { CaseStudy } from "./types";
import { CHOWMILL } from "./chowmill";
import { GYMOWNERS } from "./gymowners";
import { SYNKEDUP } from "./synkedup";
import { ZAKAAT } from "./zakaat";

export type { CaseBlock, CaseImage, CaseSection, CaseStudy } from "./types";

export const CASE_STUDIES: Record<string, CaseStudy> = {
  chowmill: CHOWMILL,
  gymowners: GYMOWNERS,
  synkedup: SYNKEDUP,
  zakaat: ZAKAAT,
};
