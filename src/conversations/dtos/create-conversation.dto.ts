import { ObjectType, InputType, Field } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@InputType()
export class CreateConversationDto {
  @Field()
  title: string;

  @Field(() => [User])
  participants: User[];
}
