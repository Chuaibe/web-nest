import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateMessageDto {
  @Field()
  @IsString()
  content: string;

  @Field()
  @IsUUID()
  senderId: string;

  @Field()
  @IsUUID()
  conversationId: string;

  @Field()
  @IsDate()
  timestamp: Date = new Date();
}
