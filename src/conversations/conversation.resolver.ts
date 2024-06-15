import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dtos/create-conversation.dto';
import { Conversation } from './entities/conversation.entity';
import { Message } from 'src/messages/entities/message.entity';

@Resolver(() => Conversation)
export class ConversationResolver {
  constructor(private readonly conversationService: ConversationService) {}

  @Query(() => [Conversation])
  async conversations() {
    return this.conversationService.getAllConversations();
  }

  @Query(() => [Conversation])
  async userConversations(@Args('userId') userId: string) {
    return this.conversationService.getUserConversations(userId);
  }

  @Query(() => [Message])
  async conversationMessages(@Args('conversationId') conversationId: string) {
    return this.conversationService.getMessagesByConversationId(conversationId);
  }

  @Mutation(() => Conversation)
  async createConversation(
    @Args('createConversationDto')
    createConversationDto: CreateConversationDto,
  ) {
    return await this.conversationService.createConversation(
      createConversationDto,
    );
  }
}
