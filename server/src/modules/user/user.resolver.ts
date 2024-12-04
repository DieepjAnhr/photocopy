import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserInput } from './inputs/create-user.dto';
import { UpdateUserInput } from './inputs/update-user.dto';
import { Role } from '../role/entity/role.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  users(@Args('query') query: CreateUserInput) {
    return this.userService.getMany();
  }

  @Query(() => User)
  user(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  createUser(@Args('create_data') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => User)
  updateUser(@Args('update_data') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }

  @ResolveField(() => Role)
  role(@Parent() user: User) {
    return user.role;
  }
}
