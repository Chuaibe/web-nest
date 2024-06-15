import { InputType, Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class ParticipantInputDto {
  @Field()
  @IsUUID()
  userId: string;
}
