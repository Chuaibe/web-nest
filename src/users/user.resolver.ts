import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Query(() => User)
  async user(@Args('id') id: string): Promise<User> {
    return await this.userService.getUserByIdOrThrow(id);
  }

  @Query(() => Boolean)
  async resetData(): Promise<boolean> {
    return await this.userService.resetData();
  }

  @Mutation(() => User)
  async createUser(
    @Args('createUserDto') createUserDto: CreateUserDto,
  ): Promise<User> {
    return await this.userService.addUser({ ...createUserDto });
  }
}
