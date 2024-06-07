import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('health-queue')
export class HealthProcessor extends WorkerHost {
  async process(job: Job<any, any, string>): Promise<any> {
    console.log('Processing job:', job.data);
  }

  @OnWorkerEvent('completed')
  onCompleted() {
    // do some stuff
  }
}
