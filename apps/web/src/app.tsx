import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/query-client'

export function App() {
  return <QueryClientProvider client={queryClient}>
    Teste
  </QueryClientProvider>
}
