import { motion, type Variants } from "motion/react"
import { cn } from "@datamorph/ui/lib/utils"
import type { MorphPreview } from "../hooks/use-file-morph"

// Variantes de animação Framer Motion (SOLID - Open/Closed)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Efeito cascata lindo
    },
  },
}

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
}

export const DataMorphGrid = ({ data }: { data: MorphPreview }) => {
  if (!data || data.headers.length === 0) return null

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mt-8 w-full space-y-4 font-mono"
    >
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between gap-4 border border-border bg-accent/50 p-4"
      >
        <h3 className="text-lg font-bold tracking-tight">
          Data Morph <span className="text-primary">Preview</span>
        </h3>
        <p className="border border-border bg-background px-2 py-1 text-xs text-muted-foreground">
          Showing first{" "}
          <span className="font-bold text-foreground">{data.rows.length}</span>{" "}
          parsed rows
        </p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="w-full overflow-x-auto border border-border bg-card shadow-inner"
      >
        <table className="w-full text-sm">
          <thead className="border-b-2 border-border">
            <tr>
              {data.headers.map((header) => (
                <th
                  key={header}
                  className="bg-muted/50 p-4 text-left font-black tracking-wider whitespace-nowrap text-muted-foreground uppercase"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, rowIndex) => (
              <motion.tr
                key={rowIndex}
                variants={itemVariants}
                custom={rowIndex}
                className={cn(
                  "border-b border-border transition-colors hover:bg-primary/5",
                  rowIndex % 2 === 0 ? "bg-background" : "bg-muted/30"
                )}
              >
                {data.headers.map((header) => {
                  const cellValue = row[header]

                  let displayValue: React.ReactNode = cellValue

                  if (
                    cellValue === null ||
                    cellValue === undefined ||
                    cellValue === ""
                  ) {
                    displayValue = (
                      <span className="text-muted-foreground/50">-</span>
                    )
                  } else if (typeof cellValue === "boolean") {
                    displayValue = cellValue ? "Verdadeiro" : "Falso"
                  } else if (typeof cellValue === "object") {
                    displayValue = JSON.stringify(cellValue)
                  }

                  return (
                    <td
                      key={`${rowIndex}-${header}`}
                      className="p-4 whitespace-nowrap text-foreground tabular-nums"
                    >
                      {displayValue}
                    </td>
                  )
                })}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Efeito visual de fumaça/fade no final da tabela se houver muitos dados */}
      <div className="relative z-10 -mt-12 h-12 w-full bg-linear-to-t from-background to-transparent" />
    </motion.div>
  )
}
