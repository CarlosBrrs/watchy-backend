import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse } from '@shared/application/response/api-response';
import { Public } from '@shared/infrastructure/auth/decorators/public.decorator';
import { AuthTokenResponseDto } from '../../../application/dtos/auth-token-response.dto';
import { LoginHandler } from '../../../application/handlers/login.handler';
import { LoginRequestDto } from '../dtos/login-request.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly loginHandler: LoginHandler,
    ) { }

    @Public()
    @Post('login')
    async login(@Body() dto: LoginRequestDto): Promise<ApiResponse<AuthTokenResponseDto>> {
        return this.loginHandler.handle(dto);
    }
}
