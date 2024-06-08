import { Injectable } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dtos/create-message.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MessageService {
  private messages: Message[] = [];

  async findByConversationId(conversationId: string): Promise<Message[]> {
    return this.messages.filter((m) => m.conversationId == conversationId);
  }

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const message = { id: uuidv4(), ...createMessageDto };

    this.messages.push(message);
    return message;
  }
}
