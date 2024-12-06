import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/common/helpers/env.validation';
import { UtilService } from 'src/common/shared/services/util.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService<EnvironmentVariables>,
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly utilService: UtilService,
    ) { }

    private async generateRefreshToken(userId: number) {
        const refreshToken = this.jwtService.sign(
            { id: userId },
            {
                secret: this.configService.get('JWT_REFRESH_TOKEN_PRIVATE_KEY'),
                expiresIn: '7d',
            },
        );
        await this.userService.update(userId, { id: userId, refresh_token: refreshToken })

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
            return this.userService.getOne(userId);
        } catch (err) {
            if (err.message === 'jwt expired') {
                this.userService.update(userId, { id: userId, refresh_token: null });
            }
        }
    }
}
