import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateUserDto } from './dto/updateUserDto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  getUser(@Args('id') id: number) {
    return this.userService.getUser(id);
  }

  @Query(() => [User])
  getUsers() {
    return this.userService.getAllUsers();
  }

  @Mutation(() => User)
  createUser(@Args('createUserDto') createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserDto') updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(updateUserDto);
  }

  @Mutation(() => User)
  deleteUser(@Args('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
