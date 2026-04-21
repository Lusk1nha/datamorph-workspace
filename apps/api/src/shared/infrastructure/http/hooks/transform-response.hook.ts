import type { FastifyRequest, FastifyReply } from 'fastify'

export const transformResponseHook = async (
  request: FastifyRequest,
  reply: FastifyReply,
  payload: any,
) => {
  // 1. IGNORAR ROTAS DE DOCUMENTAÇÃO
  // Se for o JSON do Swagger ou a interface do Scalar, retorna o payload puro.
  if (
    request.url.includes('/docs') ||
    request.url.includes('/openapi.json') ||
    request.url.includes('/swagger')
  ) {
    return payload
  }

  // Mantém suas verificações existentes
  if (reply.statusCode >= 400) return payload
  if (payload instanceof Buffer || payload?.pipe) return payload

  const isPaginated =
    payload &&
    typeof payload === 'object' &&
    'data' in payload &&
    'meta' in payload &&
    Array.isArray(payload.data)

  // 2. Transforma o corpo da resposta para as rotas da API
  return {
    statusCode: reply.statusCode,
    message: payload?.message || null,
    data: isPaginated ? payload.data : (payload ?? null),
    meta: isPaginated ? payload.meta : undefined,
    timestamp: new Date().toISOString(),
    path: request.url,
  }
}
