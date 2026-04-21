import { useState } from "react"

import { FileInput, FilePreviewCard } from "@datamorph/ui/components/file-input"
import { Button } from "@datamorph/ui/components/button"

import { DataMorphGrid } from "../components/data-morph-grid"
import { useMorphMutation } from "../hooks/use-morph-mutation"

export function DataMorphPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { mutate, data: result, isPending, reset } = useMorphMutation()

  const handleFileChange = (files: File[]) => {
    const file = files?.[0]

    if (file) {
      setSelectedFile(file)
      reset()
    }
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    reset()
  }

  const handleProcessClick = () => {
    if (selectedFile) mutate(selectedFile)
  }

  const previewFormat = result
    ? {
        headers:
          result.preview?.length > 0 ? Object.keys(result.preview[0]) : [],
        rows: result.preview as Record<string, any>[],
        totalRows: result.totalRows,
      }
    : null

  return (
    <main className="min-h-screen bg-background p-6 font-mono text-foreground selection:bg-primary/20 md:p-12">
      <div className="mx-auto max-w-7xl space-y-12">
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight">Upload Dataset</h2>
            <p className="text-sm text-muted-foreground">
              Select structured data to process in Rust.
            </p>
          </div>

          {!selectedFile && (
            <FileInput
              onFilesSelected={handleFileChange}
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            />
          )}

          {selectedFile && !isPending && !result && (
            <div className="animate-fade-in space-y-4">
              <FilePreviewCard
                file={selectedFile}
                onRemove={handleRemoveFile}
              />
              <div className="flex justify-end border-t border-border pt-4">
                <Button
                  onClick={handleProcessClick}
                  size="lg"
                  className="font-bold"
                >
                  Engage Rust Engine
                </Button>
              </div>
            </div>
          )}

          {isPending && (
            <div className="flex h-64 w-full animate-pulse flex-col items-center justify-center gap-4 border border-border bg-card">
              <p className="text-sm tracking-widest text-muted-foreground uppercase">
                Motor Rust processando...
              </p>
            </div>
          )}
        </section>

        {previewFormat && (
          <section className="animate-fade-in">
            <div className="mb-4 inline-block border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
              Success! Processed {result?.totalRows} rows in metal speed.
            </div>
            <DataMorphGrid data={previewFormat} />
          </section>
        )}
      </div>
    </main>
  )
}
