import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"
import { DataMorphService } from "../services/data-morph.service"

export const useMorphMutation = () => {
  return useMutation({
    mutationFn: (file: File) => DataMorphService.processExcel(file),
    onSuccess: (data) => {
      toast.success(data.message, {
        description: `Processadas ${data.totalRows} linhas no motor Rust.`,
      })
    },
  })
}
