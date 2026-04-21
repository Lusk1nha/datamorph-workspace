import z from 'zod'

import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { ProcessExcelUseCase } from '@/modules/data-processing/application/use-cases/process-excel.usecase'
import { DataProcessingController } from '../controllers/data-processing.controller'
import { createApiResponseSchema } from '@/shared/infrastructure/http/utils/response-schema.util'

const useCase = new ProcessExcelUseCase()
const controller = new DataProcessingController(useCase)

export const dataProcessingRoutes: FastifyPluginAsyncZod = async (server) => {
  server.post(
    '/process-excel',
    {
      schema: {
        tags: ['Data Processing'],
        summary: 'Process large Excel files via Rust Engine',
        // A documentação multipart no Swagger exige consumes
        consumes: ['multipart/form-data'],
        response: {
          200: createApiResponseSchema(
            z.object({
              message: z.string(),
              totalRows: z.number(),
              preview: z.array(z.any()),
            }),
          ),
        },
      },
    },
    controller.uploadExcel.bind(controller),
  )
}
