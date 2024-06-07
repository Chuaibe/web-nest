import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { Message } from '../../messages/entities/message.entity';

@ObjectType()
export class Conversation {
  @Field(() => ID)
  id: string;
  
  @Field()
  title: string

  @Field(() => [Message])
  messages: Message[];

  @Field(() => [User])
  participants: User[];
}
