import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dtos/create-message.dto';
import { Message } from './entities/message.entity';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';

@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly messageService: MessageService,
    @InjectQueue('message-queue') private readonly messageQueue: Queue
  ) {}

  @Query(() => [Message])
  async messages(conversationId: string): Promise<Message[]> {
    return await this.messageService.findByConversationId(conversationId);
  }

  @Mutation(() => Message)
  async sendMessage(createMessageDto: CreateMessageDto): Promise<Message> {
    await this.messageQueue.add('sendMessage', createMessageDto);
    return createMessageDto as Message;
  }
}