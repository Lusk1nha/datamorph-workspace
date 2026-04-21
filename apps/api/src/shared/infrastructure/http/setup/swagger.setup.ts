import fp from "fastify-plugin";
import { fastifySwagger } from "@fastify/swagger";
import scalarAPIReference from "@scalar/fastify-api-reference";
import { jsonSchemaTransform } from "fastify-type-provider-zod";

import { env } from "@/shared/infrastructure/env";
import { Environment } from "@/shared/infrastructure/env/env-schema";

export const swaggerSetup = fp(async (server) => {
  if (env.NODE_ENV === Environment.Development) {
    await server.register(fastifySwagger, {
      openapi: {
        info: {
          title: "DataMorph API",
          description: "Core Engine",
          version: "1.0.0",
        },
      },
      transform: jsonSchemaTransform,
    });

    await server.register(scalarAPIReference, {
      routePrefix: "/docs",
    });
  }
});
