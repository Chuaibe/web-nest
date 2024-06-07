import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports:[
    BullModule.forRoot({
      connection: {
        host: 'redis',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'message-queue',
    }
  ),
  ],
  providers: [MessageService, MessageResolver],
})
export class MessageModule {}