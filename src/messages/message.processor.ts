import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dtos/create-message.dto';
import { Message } from './entities/message.entity';

@Processor('message-queue')
export class MessageProcessor extends WorkerHost {
  constructor(private readonly messageService: MessageService) {
    super();
  }

  async process(job: Job<CreateMessageDto>): Promise<Message> {
    const createdMessage = await this.messageService.createMessage(job.data);
    console.log('Message sent:', createdMessage);
    return createdMessage;
  }
}
