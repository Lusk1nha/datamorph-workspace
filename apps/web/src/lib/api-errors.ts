import axios from 'axios'
import type { ProblemDetails } from '@/shared/types/api-error.type'

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const problem = error.response?.data as Partial<ProblemDetails>

    if (problem && problem.issues) {
      return problem.issues.join("\n")
    }

    if (error.response?.status === 500) {
      return "Erro interno do servidor. Tente novamente mais tarde."
    }

    return error.message || 'Erro de comunicação com o servidor.'
  }

  // Fallback para erros nativos do JS (ex: TypeError)
  if (error instanceof Error) {
    return error.message
  }

  return 'Ocorreu um erro inesperado.'
}
