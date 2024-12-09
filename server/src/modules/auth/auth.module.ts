import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { EnvironmentVariables } from 'src/common/helpers/env.validation';
import { UtilModule } from 'src/common/shared/services/util.module';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

import { UserModule } from '../users/user.module';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        privateKey: configService.get('JWT_PRIVATE_KEY'),
        publicKey: configService.get('JWT_PUBLIC_KEY'),
        signOptions: {
          algorithm: 'RS256',
          expiresIn: '1d',
        },
        verifyOptions: {
          algorithms: ['RS256'],
        },
      }),
    }),
    ConfigModule,
    UserModule,
    UtilModule,
  ],
  providers: [
    AuthResolver,
    AuthService,
    JwtStrategy,
    LocalStrategy,
    JwtRefreshStrategy,
  ],
})
export class AuthModule {}
