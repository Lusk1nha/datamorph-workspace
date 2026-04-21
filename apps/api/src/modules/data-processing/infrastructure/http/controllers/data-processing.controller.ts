import type { FastifyRequest, FastifyReply } from 'fastify'
import { pipeline } from 'node:stream/promises'
import { createWriteStream } from 'node:fs'
import { unlink } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { randomUUID } from 'node:crypto'

import { ProcessExcelUseCase } from '@/modules/data-processing/application/use-cases/process-excel.usecase'
import { AppError } from '@/shared/domain/errors/app.error'

export class DataProcessingController {
  constructor(private processExcelUseCase: ProcessExcelUseCase) {}

  async uploadExcel(request: FastifyRequest, reply: FastifyReply) {
    const data = await request.file()

    if (!data) {
      throw new AppError('Nenhum arquivo enviado.', 400)
    }

    const tempFilePath = path.join(
      os.tmpdir(),
      `${randomUUID()}-${data.filename}`,
    )

    try {
      await pipeline(data.file, createWriteStream(tempFilePath))

      const parsedData = await this.processExcelUseCase.execute(tempFilePath)

      return reply.status(200).send({
        message: 'Planilha processada com sucesso!',
        totalRows: parsedData.length,
        preview: parsedData.slice(0, 5),
      })
    } finally {
      await unlink(tempFilePath).catch((err) =>
        request.log.error(
          `Falha ao deletar arquivo temporário: ${err.message}`,
        ),
      )
    }
  }
}
