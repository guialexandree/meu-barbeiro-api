export interface ISmsAdapter<T> {
  send(to: string, text: string): Promise<T>;
}
