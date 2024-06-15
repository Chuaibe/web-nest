import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dtos/create-conversation.dto';
import { ConversationResolver } from './conversation.resolver';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { UserModule } from '../users/user.module';

@Module({
  imports: [UserModule],
  providers: [
    PrismaService,
    ConversationService,
    CreateConversationDto,
    ConversationResolver,
  ],
  exports: [ConversationService],
})
export class ConversationModule {}
