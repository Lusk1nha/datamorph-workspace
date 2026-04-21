import fp from "fastify-plugin";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import compress from "@fastify/compress";

import { env } from "@/shared/infrastructure/env";
import { Environment } from "@/shared/infrastructure/env/env-schema";

export const securitySetup = fp(async (server) => {
  const isDev = env.NODE_ENV === Environment.Development;

  await server.register(helmet, { global: true });
  await server.register(compress, { global: true });
  await server.register(rateLimit, { max: 100, timeWindow: "1 minute" });
  await server.register(cors, {
    origin: isDev ? true : env.FRONTEND_URL,
    credentials: true,
  });
});
