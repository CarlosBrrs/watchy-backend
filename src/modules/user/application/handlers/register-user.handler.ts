import { ApiResponse } from '@shared/application/response/api-response';
import { UserResponseDto } from '../../application/dtos/user-response.dto';
import { RegisterUserRequestDto } from '../../infrastructure/http/dtos/register-user-request.dto';

export abstract class RegisterUserHandler {
    abstract handle(dto: RegisterUserRequestDto): Promise<ApiResponse<UserResponseDto>>;
}
