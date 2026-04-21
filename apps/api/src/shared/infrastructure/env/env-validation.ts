import z from "zod";
import { envSchema } from "@/shared/infrastructure/env/env-schema";

export function validate(config: Record<string, unknown>) {
  const result = envSchema.safeParse(config);

  if (!result.success) {
    console.error(
      "❌ Invalid environment variables:",
      z.treeifyError(result.error),
    );

    throw new Error("Invalid environment variables");
  }

  return result.data;
}
