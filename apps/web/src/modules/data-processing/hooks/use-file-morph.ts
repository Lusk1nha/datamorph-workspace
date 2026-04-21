import { z } from "zod"
import { useState, useCallback } from "react"
import Papa from "papaparse"

// Validação estrita com Zod (SOLID - Single Responsibility)
const fileSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 50 * 1024 * 1024, "Max size is 50MB")
    .refine(
      (file) =>
        [
          "text/csv",
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ].includes(file.type),
      "Only CSV or Excel files are accepted"
    ),
})

export interface MorphPreview {
  headers: string[]
  rows: Record<string, string>[]
  totalRows: number
}

export const useFileMorph = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewData, setPreviewData] = useState<MorphPreview | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const parseFile = useCallback((file: File) => {
    setIsLoading(true)
    setError(null)
    setPreviewData(null)

    // Atualmente PapaParse lida bem com CSV.
    // Para Excel real (.xlsx), precisaríamos da lib 'xlsx' aqui.
    if (file.type === "text/csv" || file.name.endsWith(".csv")) {
      Papa.parse(file, {
        header: true,
        preview: 10, // Pega apenas 10 linhas para impacto rápido
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length > 0) {
            setError("Error parsing CSV: " + results.errors.message)
            setPreviewData(null)
          } else {
            setPreviewData({
              headers: results.meta.fields || [],
              rows: results.data as Record<string, string>[],
              totalRows: results.data.length, // Nota: PapaParse preview n mostra total real, assumimos o tamanho do preview
            })
          }
          setIsLoading(false)
        },
        error: (err: any) => {
          setError("Fatal error during parsing: " + err.message)
          setIsLoading(false)
        },
      })
    } else {
      // Simulação para Excel para fins de demonstração visual
      setTimeout(() => {
        setError(
          "Demonstration: Excel parsing requires 'xlsx' library. Preview works best with CSV currently."
        )
        setIsLoading(false)
      }, 1500)
    }
  }, [])

  const handleFileChange = useCallback(
    (files: File[]) => {
      const file = files
      if (!file) return

      const result = fileSchema.safeParse({ file })

      if (!result.success) {
        setError(z.treeifyError(result.error).errors.join(", "))
        setSelectedFile(file[0]) // Mostra o arquivo msm com erro
        setPreviewData(null)
        return
      }

      setError(null)
      setSelectedFile(file[0])
      parseFile(file[0])
    },
    [parseFile]
  )

  const removeFile = useCallback(() => {
    setSelectedFile(null)
    setPreviewData(null)
    setError(null)
  }, [])

  return {
    selectedFile,
    previewData,
    error,
    isLoading,
    handleFileChange,
    removeFile,
  }
}
