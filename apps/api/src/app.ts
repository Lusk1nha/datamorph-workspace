import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'

// --- Setups & Hooks ---
import { getLoggerConfig } from '@/shared/infrastructure/http/setup/logger.setup'
import { securitySetup } from '@/shared/infrastructure/http/setup/security.setup'
import { swaggerSetup } from '@/shared/infrastructure/http/setup/swagger.setup'
import { errorHandlerSetup } from '@/shared/infrastructure/http/setup/error-handler.setup'
import { transformResponseHook } from '@/shared/infrastructure/http/hooks/transform-response.hook'

// --- Rotas ---
import { healthRoutes } from '@/modules/health/infrastructure/http/routes/health.route'
import { dataProcessingRoutes } from '@/modules/data-processing/infrastructure/http/routes/process-data.route'

const logger = getLoggerConfig()

const server = fastify({
  logger,
  bodyLimit: 10485760, // 10MB
  disableRequestLogging: true,
}).withTypeProvider<ZodTypeProvider>()

// 1. Compiladores Zod
server.setSerializerCompiler(serializerCompiler)
server.setValidatorCompiler(validatorCompiler)

// 2. Lifecycle Hooks
server.addHook('preSerialization', transformResponseHook)

// 3. Plugins de Infraestrutura
server.register(securitySetup)
server.register(swaggerSetup)

// 4. Tratamento de Erros Global
errorHandlerSetup(server)

// 5. Módulos de Domínio (Rotas)
server.register(healthRoutes, { prefix: '/api/v1' })
server.register(dataProcessingRoutes, { prefix: '/api/v1/data' })

export { server }
