import { ObjectType, InputType, Field } from '@nestjs/graphql';
import { Message } from 'src/messages/entities/message.entity';
import { User } from 'src/users/entities/user.entity';

@InputType()
export class CreateConversationDto {
  @Field()
  title: string

  @Field(() => [User])
  participants: User[];
}
