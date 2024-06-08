import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  private users: User[] = [];

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }

  async getUserById(id: string): Promise<User> {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = this.users.find((u) => u.email === email);
    if (user == null) {
      return null;
    }
    return user;
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const existingUser = await this.getUserByEmail(user.email);
    if (existingUser != null)
      throw new ConflictException('Email already in use');

    const newUser = { id: uuidv4(), ...user };
    this.users.push(newUser);
    return newUser;
  }

  async resetData(): Promise<void> {
    this.users = [];
  }
}
