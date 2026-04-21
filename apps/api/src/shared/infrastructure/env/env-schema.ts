import { z } from "zod";

export enum Environment {
  Development = "development",
  Test = "test",
  Production = "production",
}

export const envSchema = z.object({
  NODE_ENV: z.enum(Environment).default(Environment.Development),

  PORT: z.coerce.number().optional().default(3333),

  FRONTEND_URL: z
    .string()
    .default("http://localhost:5173")
    .transform((val) => val.split(",").map((url) => url.trim())),
});

export type Env = z.infer<typeof envSchema>;
