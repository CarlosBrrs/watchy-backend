import { Injectable } from '@nestjs/common';
import { ApiResponse } from '@shared/application/response/api-response';
import { ResponseFactory } from '@shared/application/response/response.factory';
import { AuthTokenResponseDto } from '../../../application/dtos/auth-token-response.dto';
import { LoginHandler } from '../../../application/handlers/login.handler';
import { LoginServicePort } from '../../../domain/ports/login.service-port';
import { LoginRequestDto } from '../dtos/login-request.dto';

@Injectable()
export class LoginHandlerImpl extends LoginHandler {
    constructor(
        private readonly loginServicePort: LoginServicePort,
    ) {
        super();
    }

    async handle(dto: LoginRequestDto): Promise<ApiResponse<AuthTokenResponseDto>> {
        const result = await this.loginServicePort.execute(dto.identifier, dto.password);
        return ResponseFactory.success(result);
    }
}
