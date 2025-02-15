import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { UserService } from '../users/user.service';
import { User } from '../users/entities/user.entity';
import { AppLogger } from 'src/common/logger/logger.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/common/helpers/env.validation';
import { UtilService } from 'src/common/shared/utils/util.service';
import { SignInInput, SignUpInput } from './inputs/auth.input';
import { JwtWithUser } from './entities/auth._entity';
import { CustomBadRequestError } from 'src/common/exceptions/bad-request.exception';

@Injectable()
export class AuthService {
  private readonly CLASS_NAME = this.constructor.name;
  private readonly _logger: AppLogger;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly utilService: UtilService,
    appLogger: AppLogger,
  ) {
    this._logger = appLogger;
  }

  private async generateRefreshToken(userId: number) {
    const refreshToken = this.jwtService.sign(
      { id: userId },
      {
        secret: this.configService.get('JWT_REFRESH_TOKEN_PRIVATE_KEY'),
        expiresIn: '7d',
      },
    );
    await this.userService.update(userId, { refresh_token: refreshToken });

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
      return this.userService.getOne({
        where: { id: userId, refresh_token: refreshToken },
      });
    } catch (err) {
      if (err.message === 'jwt expired') {
        this.userService.update(userId, { refresh_token: null });
      }
    }
  }

  generateAccessToken(user: User, refreshToken: string) {
    return this.jwtService.sign({
      ...this.utilService.pick(user, ['id']),
      refresh_token: refreshToken,
    });
  }

  async signUp(input: SignUpInput): Promise<JwtWithUser> {
    const userExisted = await this.userService.getOne({
      where: { phone: input.phone },
    });

    if (userExisted) {
      throw new CustomBadRequestError('Số điện thoại đã được sử dụng');
    }

    const user = await this.userService.create({ ...input });

    return this.signIn(user);
  }

  async signIn(user: User) {
    const refreshToken = await this.generateRefreshToken(user.id);
    const jwt = this.generateAccessToken(user, refreshToken);

    return { jwt, user };
  }

  async validateUser(input: SignInInput) {
    const { phone, password } = input;

    const user = await this.userService.getOne({ where: { phone } });
    if (!user) {
      return null;
    }
    const isValid: boolean = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return null;
    }

    return user;
  }

  private get logger() {
    return {
      debug: (message: string) => this._logger.debug(message, this.CLASS_NAME),
      error: (message: string) => this._logger.error(message, this.CLASS_NAME),
      log: (message: string) => this._logger.log(message, this.CLASS_NAME),
      verbose: (message: string) =>
        this._logger.verbose(message, this.CLASS_NAME),
      warn: (message: string) => this._logger.warn(message, this.CLASS_NAME),
    };
  }
}
