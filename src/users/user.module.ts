import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from '../infrastructure/prisma/prisma.service';

@Module({
  providers: [PrismaService, UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
