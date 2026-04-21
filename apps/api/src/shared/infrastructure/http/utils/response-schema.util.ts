import z from "zod";

/**
 * Envelopa qualquer schema Zod no padrão de resposta da nossa API.
 */
export function createApiResponseSchema<T extends z.ZodTypeAny>(dataSchema: T) {
  return z.object({
    statusCode: z.number(),
    message: z.string().nullable(),
    data: dataSchema.nullable(),
    meta: z.any().optional(),
    timestamp: z.string(),
    path: z.string(),
  });
}
