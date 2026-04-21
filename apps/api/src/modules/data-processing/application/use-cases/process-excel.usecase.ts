import { DataProcessor } from '@datamorph/napi'
import { AppError } from '@/shared/domain/errors/app.error'

export class ProcessExcelUseCase {
  async execute(filePath: string): Promise<any> {
    const processor = new DataProcessor()

    try {
      const json = processor.processExcelToJson(filePath)
      return JSON.parse(json)
    } catch (error: any) {
      throw new AppError(`Erro ao processar planilha: ${error.message}`, 422)
    }
  }
}
