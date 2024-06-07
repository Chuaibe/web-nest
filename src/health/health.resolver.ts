import { Resolver, Query } from '@nestjs/graphql';
import { HealthCheckResult } from './health.model';

@Resolver(() => HealthCheckResult)
export class HealthResolver {
  @Query(() => HealthCheckResult)
  healthCheck(): HealthCheckResult {
    return { result: 'ok' };
  }
}
