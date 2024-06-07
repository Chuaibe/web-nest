import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { HealthProcessor } from './health/health.processor';
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

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'redis',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'health-queue',
    }
  ),
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
  controllers: [AppController, HealthController],
  providers: [AppService, MessageService, HealthProcessor, MessageProcessor],
})
export class AppModule {}
