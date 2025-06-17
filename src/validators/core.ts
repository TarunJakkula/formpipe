import { Validator } from "../types";
import email from "./email";
import non_empty from "./non_empty";
import trimmed_non_empty from "./trimmed_non_empty";

export const coreValidators: Record<string, Validator> = {
  non_empty,
  trimmed_non_empty,
  email,
};
