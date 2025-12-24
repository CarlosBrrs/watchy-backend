import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UserPersistencePort } from '@modules/user/domain/ports/user-persistence.port';
import { AuthTokenResponseDto } from '../dtos/auth-token-response.dto';
import { LoginServicePort } from '../../domain/ports/login.service-port';
import { InvalidCredentialsException } from '../../domain/exceptions/auth.exception';

@Injectable()
export class LoginUseCase extends LoginServicePort {
    constructor(
        private readonly userPersistencePort: UserPersistencePort,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {
        super();
    }

    async execute(identifier: string, password: string): Promise<AuthTokenResponseDto> {
        const user = await this.findUserByIdentifier(identifier);

        if (!user) {
            throw new InvalidCredentialsException();
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            throw new InvalidCredentialsException();
        }

        return this.generateToken(user.id, user.username);
    }

    private async findUserByIdentifier(identifier: string) {
        let user = await this.userPersistencePort.findByEmail(identifier);
        if (!user) {
            user = await this.userPersistencePort.findByUsername(identifier);
        }
        return user;
    }

    private generateToken(userId: string, username: string): AuthTokenResponseDto {
        const payload = { sub: userId, username };
        const accessToken = this.jwtService.sign(payload);

        const dto = new AuthTokenResponseDto();
        dto.accessToken = accessToken;
        dto.tokenType = 'Bearer';
        dto.expiresIn = this.configService.get<number>('JWT_EXPIRATION') || 3600;

        return dto;
    }
}
