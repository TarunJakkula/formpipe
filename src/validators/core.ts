import { Validator } from "../types.js";
import email from "./email.js";
import non_empty from "./non_empty.js";
import trimmed_non_empty from "./trimmed_non_empty.js";

export const coreValidators: Record<string, Validator> = {
  non_empty,
  trimmed_non_empty,
  email,
};

export type CoreValidators = typeof coreValidators;
