import "dotenv/config";
import { server } from "@/app";
import { env } from "@/shared/infrastructure/env";

const start = async () => {
  try {
    await server.listen({ port: env.PORT, host: "0.0.0.0" });
    server.log.info(`HTTP server running on port ${env.PORT}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();

const listeners = ["SIGINT", "SIGTERM"];

listeners.forEach((signal) => {
  process.on(signal, async () => {
    server.log.info(`\n[${signal}] Recebido. Iniciando desligamento seguro...`);

    try {
      await server.close();
      server.log.info("Servidor HTTP fechado.");

      server.log.info("Desligamento concluído com sucesso.");
      process.exit(0);
    } catch (err) {
      server.log.error(err, "Erro durante o desligamento seguro.");
      process.exit(1);
    }
  });
});
