import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';

import { UserService } from '../../user/user.service';
import { EnvironmentVariables } from 'src/common/helpers/env.validation';
import { CustomUnauthorizedError } from 'src/common/exceptions/unauthorize.exception';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_PUBLIC_KEY'),
    });
  }

  async validate(payload: { id: number }, done: VerifiedCallback) {
    try {
      const userData = await this.userService.getOne({
        where: { id: payload.id },
        relations: ['roles', 'roles.permissions'],
      });

      done(null, userData);
    } catch (err) {
      throw new CustomUnauthorizedError(err.message);
    }
  }
}
