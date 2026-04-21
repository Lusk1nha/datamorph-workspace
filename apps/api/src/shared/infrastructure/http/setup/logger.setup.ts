import { env } from "@/shared/infrastructure/env";
import { Environment } from "@/shared/infrastructure/env/env-schema";

export const getLoggerConfig = () => {
  const isDev = env.NODE_ENV === Environment.Development;

  return {
    level: isDev ? "debug" : "info",
    transport: isDev
      ? {
          target: "pino-pretty",
          options: { translateTime: "HH:MM:ss Z", ignore: "pid,hostname" },
        }
      : undefined,
  };
};
