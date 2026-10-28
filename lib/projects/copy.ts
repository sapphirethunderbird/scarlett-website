import type { Locale } from "@/lib/i18n/config";
import type { ProjectCopy } from "../projects";
import { PROJECT_COPY_JA } from "./ja";

/**
 * Translated project prose, by locale then by slug. English is the source in
 * `lib/projects.ts` and has no entry here.
 */
export const PROJECT_COPY: Partial<
  Record<Locale, Record<string, ProjectCopy>>
> = {
  ja: PROJECT_COPY_JA,
};
