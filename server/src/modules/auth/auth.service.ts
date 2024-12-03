import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { EnvironmentVariables } from 'src/common/helpers/env.validation';
import { User } from '../user/entities/user.entity';
import { UtilService } from 'src/common/shared/services/util.service';
import { SignUpInput } from './dto/query-auth.dto';
import { JwtWithUser } from './entity/auth.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly utilService: UtilService,
    private readonly userService: UserService,
  ) {}

  private async generateRefreshToken(userId: number) {
    const refreshToken = this.jwtService.sign(
      {
        user_id: userId,
      },
      {
        secret: this.configService.get('JWT_REFRESH_TOKEN_PRIVATE_KEY'),
        expiresIn: '7d',
      },
    );

    // await this.userService.update(userId, { refresh_token: refreshToken });

    return refreshToken;
  }

  async verifyRefreshToken(userId: number, token: string) {
    try {
      this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_TOKEN_PRIVATE_KEY'),
      });

      // return this.userService.getOne({ where: { id: userId, refresh_token: token } });
    } catch (error) {
      if (error.message === 'jwt expired') {
        // this.userService.update(userId, { refresh_token: null });
      }
    }
  }

  generateAccessToken(user: User, refreshToken: string) {
    return this.jwtService.sign({
      ...this.utilService.pick(user, ['id', 'role_id']),
      refreshToken,
    });
  }

  async signUp(input: SignUpInput): Promise<JwtWithUser> {
    const existedUser = await this.userService.findOne(1);

    if (!existedUser) {
      throw new BadRequestException('Username already exists');
    }

    const user = await this.userService.create({
      ...input,
      role_id: 1,
      creator_id: 1,
      updater_id: 1,
    });

    return this.signIn(user);
  }

  async signIn(user: User) {
    const refreshToken = await this.generateRefreshToken(user.id);
    const jwt = this.generateAccessToken(user, refreshToken);

    return { jwt, user };
  }

  async validateUser(input: SignUpInput) {
    const { username, password } = input;

    const user = await this.userService.findOne(1);
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
