import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConversationDto } from './dtos/create-conversation.dto';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { UserService } from '../users/user.service';

@Injectable()
export class ConversationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async getAllConversations() {
    return this.prisma.conversation.findMany();
  }

  async getConversationByIdOrThrow(id: string) {
    const conversation = await this.findConversation(id);
    if (!conversation) {
      throw new NotFoundException(`Conversation with id ${id} not found`);
    }
    return conversation;
  }

  async createConversation(createConversationDto: CreateConversationDto) {
    const { title, participants } = createConversationDto;

    for (const participant of participants) {
      try {
        await this.userService.getUserByIdOrThrow(participant.userId);
      } catch (error) {
        throw new NotFoundException(
          `Conversation with id ${participant.userId} not found`,
        );
      }
    }
    const participantsData = participants.map((participant) => ({
      user: { connect: { id: participant.userId } },
    }));

    return this.prisma.conversation.create({
      data: {
        title,
        participants: {
          create: participantsData,
        },
      },
    });
  }

  async getMessagesByConversationId(conversationId: string) {
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
      include: { messages: true },
    });
    if (!conversation) {
      throw new NotFoundException(
        `Conversation with id ${conversationId} not found`,
      );
    }
    return conversation.messages;
  }

  async getUserConversations(userId: string) {
    await this.userService.getUserByIdOrThrow(userId);

    return this.prisma.conversation.findMany({
      where: {
        participants: {
          some: { userId },
        },
      },
    });
  }

  /* *
   * Private Methods
   * */

  private async findConversation(id: string) {
    try {
      return await this.prisma.conversation.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new error(
        `An error occurred while finding conversation by id: ${error.message()}`,
      );
    }
  }
}
