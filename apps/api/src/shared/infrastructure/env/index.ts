import { validate } from "@/shared/infrastructure/env/env-validation";

export const env = validate(process.env);
