import * as React from "react"
import { cn } from "../lib/utils"
import {
  MicrosoftExcelLogoIcon,
  UploadIcon,
  XIcon,
} from "@phosphor-icons/react"

export interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onFilesSelected?: (files: File[]) => void
  error?: string
}

export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, onFilesSelected, error, ...props }, ref) => {
    const [isDragOver, setIsDragOver] = React.useState(false)
    const internalRef = React.useRef<HTMLInputElement>(null)

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      event.stopPropagation()
      setIsDragOver(true)
    }

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      event.stopPropagation()
      setIsDragOver(false)
    }

    const processFiles = (files: FileList | null) => {
      if (files && files.length > 0 && onFilesSelected) {
        onFilesSelected(Array.from(files))
      }
    }

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      event.stopPropagation()
      setIsDragOver(false)
      processFiles(event.dataTransfer.files)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      processFiles(event.target.files)
    }

    // Combina a ref externa com a interna
    React.useImperativeHandle(ref, () => internalRef.current!)

    return (
      <div className="w-full space-y-2 font-mono">
        <div
          className={cn(
            // Base style: Square, dashed border, JetBrains Mono
            "group relative flex h-64 w-full cursor-pointer flex-col items-center justify-center border-2 border-dashed shadow-sm transition-all duration-300",
            "border-border bg-card hover:border-primary/50",
            // Drag over state: High impact solid primary border
            isDragOver &&
              "scale-[1.01] border-solid border-primary bg-primary/5 shadow-lg",
            // Error state
            error && "border-destructive hover:border-destructive",
            className
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => internalRef.current?.click()}
        >
          <input
            type="file"
            ref={internalRef}
            className="sr-only"
            onChange={handleChange}
            {...props}
          />

          {/* Visual Content with hover animation */}
          <div className="group-hover:animate-pulse-fast flex flex-col items-center gap-4 p-6 text-center">
            <div
              className={cn(
                "border border-border bg-muted p-4 transition-colors",
                isDragOver && "border-primary bg-primary"
              )}
            >
              <UploadIcon
                className={cn(
                  "h-10 w-10 text-muted-foreground transition-colors",
                  isDragOver && "text-primary-foreground"
                )}
                strokeWidth={1}
              />
            </div>
            <div className="space-y-1">
              <p className="text-lg font-bold tracking-tight">
                <span className="text-primary">Morph</span> your data
              </p>
              <p className="text-sm text-muted-foreground">
                Drag & Drop or click to upload Excel/CSV
              </p>
            </div>
          </div>

          {/* Glitch effect border on high impact zones (dark mode) */}
          <div className="dark:absolute dark:inset-0 dark:border dark:border-primary/20 dark:opacity-0 dark:transition-opacity dark:group-hover:opacity-100" />
        </div>

        {error && (
          <p className="animate-shake text-xs text-destructive">{error}</p>
        )}
      </div>
    )
  }
)

FileInput.displayName = "FileInput"

// Auxiliar component to show selected file before preview
export const FilePreviewCard = ({
  file,
  onRemove,
}: {
  file: File
  onRemove: () => void
}) => (
  <div className="animate-slide-in-top flex w-full items-center justify-between border border-border bg-card p-4 font-mono">
    <div className="flex items-center gap-3">
      <MicrosoftExcelLogoIcon className="h-8 w-8 text-primary" />
      <div>
        <p className="max-w-xs truncate text-sm font-bold">{file.name}</p>
        <p className="text-xs text-muted-foreground">
          {(file.size / 1024 / 1024).toFixed(2)} MB
        </p>
      </div>
    </div>
    <button
      onClick={onRemove}
      className="radius-sm p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
    >
      <XIcon className="h-5 w-5" />
    </button>
  </div>
)
