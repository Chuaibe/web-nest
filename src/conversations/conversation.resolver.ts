import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dtos/create-conversation.dto';
import { Conversation } from './entities/conversation.entity';
import { Message } from 'src/messages/entities/message.entity';

@Resolver(() => Conversation)
export class ConversationResolver {
  constructor(private readonly conversationService: ConversationService) {}

  @Query(() => [Conversation])
  async conversations(): Promise<Conversation[]> {
    return await this.conversationService.getAllConversations();
  }

  @Query(() => [Conversation])
  async userConversations(
    @Args('userID') userId: string,
  ): Promise<Conversation[]> {
    return this.conversationService.getUserConversations(userId);
  }

  @Query(() => [Message])
  async conversationMessages(
    @Args('conversationId') conversationId: string,
  ): Promise<Message[]> {
    return this.conversationService.getMessagesByConversationId(conversationId);
  }

  @Mutation(() => Conversation)
  async createConversation(@Args('createConversationDto')
    createConversationDto: CreateConversationDto,
  ): Promise<Conversation> {
    return await this.conversationService.createConversation(
      createConversationDto,
    );
  }
}
