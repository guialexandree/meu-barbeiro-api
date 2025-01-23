export type DefaultResponse<T> = {
  statusCode: number;
  message: string;
  data: T;
  notifications: string[];
};
