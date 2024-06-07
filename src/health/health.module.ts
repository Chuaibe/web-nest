import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { HealthController } from './health.controller';
import { HealthProcessor } from './health.processor';
import { HealthResolver } from './health.resolver';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'health-queue',
    }),
  ],
  controllers: [HealthController],
  providers: [HealthProcessor, HealthResolver],
})
export class HealthModule {}
