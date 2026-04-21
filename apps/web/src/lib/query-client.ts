import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query'
import { getErrorMessage } from './api-errors'

const handleGlobalError = (error: unknown) => {
  const message = getErrorMessage(error)
  if (message) {
    toast.error(message)
  }
}

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({ onError: handleGlobalError }),
  queryCache: new QueryCache({ onError: handleGlobalError }),
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutos
      refetchOnWindowFocus: false,
    },
  },
})
