import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dtos/create-conversation.dto';

@Module({
  providers: [ConversationService, CreateConversationDto],
})
export class ConversationModule {}
