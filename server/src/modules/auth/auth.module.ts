import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { EnvironmentVariables } from 'src/common/helpers/env.validation';
import { UserModule } from '../user/user.module';
import { UtilModule } from 'src/common/shared/services/util.module';

@Module({
  imports: [
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
    UtilModule,
    UserModule,
  ],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
