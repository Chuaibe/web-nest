import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Message } from '../../messages/entities/message.entity';
import { ParticipantInputDto } from '../dtos/participant-input.dto';

@ObjectType()
export class Conversation {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field(() => [Message])
  messages: Message[];

  @Field(() => [String])
  participants: ParticipantInputDto[];
}
