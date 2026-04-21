import z from "zod";

import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { HealthController } from "@/modules/health/infrastructure/http/controllers/health.controller";

import { CheckHealthUseCase } from "@/modules/health/application/use-cases/check-health.usecase";
import { createApiResponseSchema } from "@/shared/infrastructure/http/utils/response-schema.util";

const checkHealthUseCase = new CheckHealthUseCase();
const healthController = new HealthController(checkHealthUseCase);

export const healthRoutes: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/health",
    {
      schema: {
        tags: ["System"],
        summary: "Check system health including Rust Engine",
        response: {
          200: createApiResponseSchema(
            z.object({
              apiStatus: z.string(),
              rustEngineStatus: z.string(),
              timestamp: z.iso.datetime(),
            }),
          ).describe("Status de saúde do sistema e do motor nativo."),
        },
      },
    },
    healthController.check.bind(healthController),
  );
};
