import { Injectable, NotFoundException } from '@nestjs/common';
import { Conversation } from './entities/conversation.entity';
import { CreateConversationDto } from './dtos/create-conversation.dto';
import { v4 as uuidv4 } from 'uuid';
import { Message } from 'src/messages/entities/message.entity';

@Injectable()
export class ConversationService {
  private conversations: Conversation[] = [];

  async getAllConversations(): Promise<Conversation[]> {
    return this.conversations;
  }

  async createConversation(
    createConversationDto: CreateConversationDto,
  ): Promise<Conversation> {
    const conversation = {
      id: uuidv4(),
      messages: [],
      ...createConversationDto,
    };
    this.conversations.push(conversation);
    return conversation;
  }

  async getMessagesByConversationId(
    conversationId: string,
  ): Promise<Message[]> {
    const conversation = this.conversations.find(
      (c) => c.id === conversationId,
    );
    if (!conversation) {
      throw new NotFoundException(
        `Conversation with id ${conversationId} not found`,
      );
    }
    return conversation.messages;
  }

  async getUserConversations(userId: string): Promise<Conversation[]> {
    return this.conversations.filter((conversation) =>
      conversation.participants.some((p) => p.id === userId),
    );
  }
}
