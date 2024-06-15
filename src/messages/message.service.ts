import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { UserService } from '../users/user.service';
import { ConversationService } from '../conversations/conversation.service';

@Injectable()
export class MessageService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly conversationService: ConversationService,
  ) {}

  async findMessageByConversationId(conversationId: string) {
    return this.prisma.message.findMany({
      where: { conversationId },
    });
  }

  async createMessage(createMessageDto: CreateMessageDto) {
    const { senderId, conversationId } = createMessageDto;

    await this.conversationService.getConversationByIdOrThrow(conversationId);
    await this.userService.getUserByIdOrThrow(senderId);

    return this.prisma.message.create({
      data: {
        ...createMessageDto,
      },
    });
  }
}
