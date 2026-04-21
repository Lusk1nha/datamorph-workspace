import type { FastifyRequest, FastifyReply } from "fastify";
import { CheckHealthUseCase } from "@/modules/health/application/use-cases/check-health.usecase";

export class HealthController {
  constructor(private checkHealthUseCase: CheckHealthUseCase) {}

  async check(request: FastifyRequest, reply: FastifyReply) {
    const result = await this.checkHealthUseCase.execute();
    return reply.status(200).send(result);
  }
}
