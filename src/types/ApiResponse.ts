export interface ApiResponse<T = any> {
  code: number
  msg: string
  data: T
} 