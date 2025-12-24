import { ApiResponse } from '@shared/application/response/api-response';
import { AuthTokenResponseDto } from '../dtos/auth-token-response.dto';
import { LoginRequestDto } from '../../infrastructure/http/dtos/login-request.dto';

export abstract class LoginHandler {
    abstract handle(dto: LoginRequestDto): Promise<ApiResponse<AuthTokenResponseDto>>;
}
