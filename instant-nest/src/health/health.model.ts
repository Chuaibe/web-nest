import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class HealthCheckResult {
  @Field()
  result: string;
}
