export interface ISocketAdapter {
  notify(event: string, data?: any): void
}
