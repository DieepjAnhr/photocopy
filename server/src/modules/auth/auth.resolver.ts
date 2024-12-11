import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CurrentUser } from 'src/common/decorators/user.decorator';

import { AuthService } from './auth.service';
import { TokenWithUser } from './entities/auth.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { SignInInput, SignUpInput } from './inputs/auth.input';
import { SignInGuard } from 'src/common/guards/graphql-signin.guard';
import { RefreshGuard } from 'src/common/guards/graphql-refresh.guard';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => TokenWithUser)
  @UseGuards(SignInGuard)
  signIn(@Args('input') _: SignInInput, @CurrentUser() user: User) {
    return this.authService.signIn(user);
  }

  @Mutation(() => TokenWithUser)
  signUp(@Args('input') input: SignUpInput) {
    return this.authService.signUp(input);
  }

  @Mutation(() => Boolean)
  @UseGuards(RefreshGuard)
  async signOut(@CurrentUser() user: User) {
    await this.userService.update(user.id, { refresh_token: null });
    return true;
  }

  @Mutation(() => TokenWithUser)
  @UseGuards(RefreshGuard)
  refreshAccessToken(@CurrentUser() user: User) {
    const token = this.authService.generateAccessToken(
      user,
      user.refresh_token,
    );

    return { token, user };
  }
}
