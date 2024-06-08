import { Module } from '@nestjs/common';
import { HealthController } from './health/health.controller';
import { BullModule } from '@nestjs/bullmq';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { HealthModule } from './health/health.module';
import { MessageModule } from './messages/message.module';
import { ConversationModule } from './conversations/conversation.module';
import { UserModule } from './users/user.module';
import { MessageProcessor } from './messages/message.processor';
import { MessageService } from './messages/message.service';
import { HealthProcessor } from './health/health.processor';
// import { BullMqModule } from './bullMq.module';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'health-queue',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    HealthModule,
    UserModule,
    ConversationModule,
    MessageModule,
  ],
  controllers: [HealthController],
  providers: [MessageService, HealthProcessor, MessageProcessor],
})
export class AppModule {}
