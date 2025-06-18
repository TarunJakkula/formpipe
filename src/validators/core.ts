import email from "./email.js";
import non_empty from "./non_empty.js";
import trimmed_non_empty from "./trimmed_non_empty.js";

export const coreValidators = {
  non_empty,
  trimmed_non_empty,
  email,
} as const;

export type CoreValidators = typeof coreValidators;
