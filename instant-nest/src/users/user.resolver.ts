import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Query(() => User)
  async user(id: string): Promise<User> {
    return await this.userService.getUserById(id)
  }

  @Mutation(() => User)
  async createUser(createUserDto :CreateUserDto): Promise<User> {
    return await this.userService.createUser({...createUserDto});
  }
}
