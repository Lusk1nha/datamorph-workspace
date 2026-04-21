import { api } from "@/lib/api-client"
import {
  processExcelResponseSchema,
  type ProcessExcelResponse,
} from "../models/data-morph.model"

export const DataMorphService = {
  processExcel: async (file: File): Promise<ProcessExcelResponse> => {
    const formData = new FormData()
    formData.append("file", file)

    const { data } = await api.post("/data/process-excel", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    return processExcelResponseSchema.parse(data.data)
  },
}
