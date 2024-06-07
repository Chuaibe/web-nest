import { Field, ObjectType, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMessageDto {
  @Field()
  content: string;

  @Field()
  senderId: string;

  @Field()
  conversationId: string;

  @Field()
  timestamp: Date;
}
