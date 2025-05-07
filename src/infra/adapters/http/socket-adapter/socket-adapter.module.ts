import { Global, Module } from '@nestjs/common'
import { SocketAdapter } from './socket-date-adapter';

@Global()
@Module({
  providers: [
    SocketAdapter,
    {
      provide: 'ISocketAdapter',
      useExisting: SocketAdapter,
    },
  ],
  exports: [
    SocketAdapter,
    {
      provide: 'ISocketAdapter',
      useExisting: SocketAdapter,
    },
  ],
})
export class SocketAdapterModule {}
