import { InputType, Field } from '@nestjs/graphql';
import { ParticipantInputDto } from './participant-input.dto';
import { IsString } from 'class-validator';

@InputType()
export class CreateConversationDto {
  @Field()
  @IsString()
  title: string;

  @Field(() => [String])
  participants: ParticipantInputDto[];
}
