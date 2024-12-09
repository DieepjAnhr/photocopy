import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';

import { AuthService } from '../auth.service';
import { EnvironmentVariables } from 'src/common/helpers/env.validation';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_PUBLIC_KEY'),
    });
  }

  async validate(
    payload: { id: number; refresh_token: string },
    done: VerifiedCallback,
  ) {
    try {
      const userData = await this.authService.verifyRefreshToken(
        payload.id,
        payload.refresh_token,
      );

      done(null, userData);
    } catch (err) {
      throw new UnauthorizedException('Error', err.message);
    }
  }
}
