import { z } from "zod"

export const processExcelResponseSchema = z.object({
  message: z.string(),
  totalRows: z.number(),
  preview: z.array(z.record(z.string(), z.any())),
})

export type ProcessExcelResponse = z.infer<typeof processExcelResponseSchema>
