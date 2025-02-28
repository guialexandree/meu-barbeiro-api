export type DefaultResponse<T> = {
  success: boolean
  message: string
  error: string
  data: T
}
