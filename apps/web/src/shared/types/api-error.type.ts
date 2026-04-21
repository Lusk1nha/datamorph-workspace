export interface ProblemDetails {
  statusCode: number
  message: string
  data: unknown
  issues?: unknown[]
  timestamp: string
  path: string
}
