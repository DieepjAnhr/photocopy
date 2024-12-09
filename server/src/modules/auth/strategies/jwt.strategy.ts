import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';

import { EnvironmentVariables } from 'src/common/helpers/env.validation';
import { UserService } from 'src/modules/users/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
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
        filter: { id: payload.id },
      });

      done(null, userData);
    } catch (err) {
      throw new UnauthorizedException('Error', err.message);
    }
  }
}
