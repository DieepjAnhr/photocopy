import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '../users/user.service';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/common/helpers/env.validation';
import { UtilService } from 'src/common/shared/services/util.service';
import { User } from '../users/entities/user.entity';
import { SignInInput, SignUpInput } from './inputs/auth.input';
import { TokenWithUser } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly utilService: UtilService,
  ) {}

  private async generateRefreshToken(userId: number) {
    const refreshToken = this.jwtService.sign(
      { id: userId },
      {
        secret: this.configService.get('JWT_REFRESH_TOKEN_PRIVATE_KEY'),
        expiresIn: '7d',
      },
    );
    await this.userService.update(userId, {
      refresh_token: refreshToken,
    });

    return refreshToken;
  }

  async verifyRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<User> {
    try {
      this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_TOKEN_PRIVATE_KEY'),
      });
      return this.userService.getOne({ filter: { id: userId } });
    } catch (err) {
      if (err.message === 'jwt expired') {
        this.userService.update(userId, { refresh_token: null });
      }
    }
  }

  generateAccessToken(user: User, refreshToken: string) {
    return this.jwtService.sign(
      {
        ...this.utilService.pick(user, ['id', 'role_id']),
        refresh_token: refreshToken,
      },
      {
        privateKey: this.configService.get('JWT_PRIVATE_KEY'),
        expiresIn: '1d',
      },
    );
  }

  async signUp(input: SignUpInput): Promise<TokenWithUser> {
    const doesExistId = await this.userService.getOne({
      filter: { username: input.username },
    });

    if (doesExistId) {
      throw new BadRequestException('Username already exists');
    }

    const user = await this.userService.create({ ...input });

    return this.signIn(user);
  }

  async signIn(user: User) {
    const refreshToken = await this.generateRefreshToken(user.id);
    const accessToken = this.generateAccessToken(user, refreshToken);

    return { access_token: accessToken, user };
  }

  async validateUser(input: SignInInput) {
    const { username, password } = input;

    const user = await this.userService.getOne({ filter: { username } });
    if (!user) {
      return null;
    }
    const isValid: boolean = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return null;
    }

    return user;
  }
}
