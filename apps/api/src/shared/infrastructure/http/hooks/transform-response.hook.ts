import type { FastifyRequest, FastifyReply } from "fastify";

export const transformResponseHook = async (
  request: FastifyRequest,
  reply: FastifyReply,
  payload: any,
) => {
  if (reply.statusCode >= 400) return payload;
  if (payload instanceof Buffer || payload?.pipe) return payload;

  const isPaginated =
    payload &&
    typeof payload === "object" &&
    "data" in payload &&
    "meta" in payload &&
    Array.isArray(payload.data);

  return {
    statusCode: reply.statusCode,
    message: payload?.message || null,
    data: isPaginated ? payload.data : (payload ?? null),
    meta: isPaginated ? payload.meta : undefined,
    timestamp: new Date().toISOString(),
    path: request.url,
  };
};
