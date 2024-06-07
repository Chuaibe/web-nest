import { ObjectType, InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;
}
