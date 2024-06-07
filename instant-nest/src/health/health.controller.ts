import { Controller, Get } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
@Controller('health')
export class HealthController {
  constructor(
    @InjectQueue('health-queue') private readonly healthQueue: Queue,
  ) {}
  @Get()
  async healthCheck(): Promise<string> {
    await this.healthQueue.add('health-check-job', { check: 'ok' });
    return 'OK';
  }
}
