import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { BullModule } from '@nestjs/bullmq';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { UserModule } from '../users/user.module';
import { ConversationModule } from '../conversations/conversation.module';

@Module({
  imports: [
    UserModule,
    ConversationModule,
    BullModule.registerQueue({
      name: 'message-queue',
    }),
  ],
  providers: [PrismaService, MessageService, MessageResolver],
  exports: [MessageService],
})
export class MessageModule {}
