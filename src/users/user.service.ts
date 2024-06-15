import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { PrismaService } from '../infrastructure/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    try {
      return this.prisma.user.findMany();
    } catch (error) {
      throw new error(
        `An error occurred while getting all users: ${error.message()}`,
      );
    }
  }

  async getUserByIdOrThrow(id: string) {
    const user = await this.findUser(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async getUserByEmail(email: string) {
    try {
      return await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });
    } catch (error) {
      throw new error(
        `An error occurred while finding user by email: ${error.message()}`,
      );
    }
  }

  async addUser(userDto: CreateUserDto) {
    this.validateEmail(userDto.email);
    await this.checkIfUserExists(userDto.email);

    return this.createUser(userDto);
  }

  async resetData(): Promise<void> {
    try {
      await this.prisma.user.deleteMany();
    } catch (error) {
      throw new error(
        `An error occurred while deleting all users: ${error.message()}`,
      );
    }
  }

  /* *
   * Private Methods
   * */

  private async findUser(id: string) {
    try {
      return await this.prisma.user.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new error(
        `An error occurred while finding user by email: ${error.message()}`,
      );
    }
  }

  private async createUser(userDto: CreateUserDto) {
    return this.prisma.user.create({
      data: userDto,
    });
  }

  private async checkIfUserExists(email: string): Promise<void> {
    const user = await this.getUserByEmail(email);
    if (user) {
      throw new ConflictException('User already exists');
    }
  }

  private validateEmail(email: string): void {
    if (!this.isValidEmail(email))
      throw new BadRequestException('Invalid email address');
  }

  private isValidEmail(email: string): boolean {
    const regex: RegExp = new RegExp('^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
    return regex.test(email);
  }
}
