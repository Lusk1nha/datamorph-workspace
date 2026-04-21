import { QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider } from "react-router-dom"

import { Toaster } from "@datamorph/ui/components/sonner"

import { queryClient } from "./lib/query-client"
import { router } from "./Router"
import { ThemeProvider } from "./components/providers/theme-provider"

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <Toaster position="top-right" expand={false} richColors />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
