import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dtos/create-message.dto';

@Processor('message-queue')
export class MessageProcessor extends WorkerHost {
  constructor(private readonly messageService: MessageService) {
    super();
  }

  async process(job: Job<CreateMessageDto>) {
    await this.messageService.create(job.data);
  }
}
