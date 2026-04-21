import type { FastifyInstance, FastifyError } from "fastify";

import { AppError } from "@/shared/domain/errors/app.error";
import { env } from "@/shared/infrastructure/env";
import { Environment } from "@/shared/infrastructure/env/env-schema";

export const errorHandlerSetup = (server: FastifyInstance) => {
  server.setErrorHandler((error: FastifyError | AppError, request, reply) => {
    const path = request.url;
    const timestamp = new Date().toISOString();

    if ("validation" in error) {
      return reply.status(400).send({
        statusCode: 400,
        message: "Error validating data.",
        data: null,
        issues: error.validation,
        timestamp,
        path,
      });
    }

    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        statusCode: error.statusCode,
        message: error.message,
        data: null,
        timestamp,
        path,
      });
    }

    request.log.error(error);

    return reply.status(500).send({
      statusCode: 500,
      message:
        env.NODE_ENV === Environment.Development
          ? error.message
          : "Internal Server Error.",
      data: null,
      timestamp,
      path,
    });
  });
};
