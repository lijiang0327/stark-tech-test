export interface ApiResponse<T> {
  data: T;
  status: number;
  msg: string;
}
