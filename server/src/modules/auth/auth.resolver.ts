import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CurrentUser } from 'src/common/decorators/user.decorator';
import { AuthService } from './auth.service';
import { JwtWithUser } from './entity/auth._entity';
import { SignInInput, SignUpInput } from './dto/auth.dto';
import { User } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import { SignInGuard } from 'src/common/guards/signin.guard';
import { RefreshGuard } from 'src/common/guards/refresh.guard';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => JwtWithUser)
  @UseGuards(SignInGuard)
  signIn(@Args('input') _: SignInInput, @CurrentUser() user: User) {
    return this.authService.signIn(user);
  }

  @Mutation(() => JwtWithUser)
  signUp(@Args('input') input: SignUpInput) {
    return this.authService.signUp(input);
  }

  @Mutation(() => Boolean)
  @UseGuards(RefreshGuard)
  async signOut(@CurrentUser() user: User) {
    await this.userService.update(user.id, { refresh_token: null });
    return true;
  }

  @Mutation(() => JwtWithUser)
  @UseGuards(RefreshGuard)
  refreshAccessToken(@CurrentUser() user: User) {
    const jwt = this.authService.generateAccessToken(user, user.refresh_token);

    return { jwt, user };
  }
}
