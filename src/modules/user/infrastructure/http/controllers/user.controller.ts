import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse } from '@shared/application/response/api-response';
import { Public } from '@shared/infrastructure/auth/decorators/public.decorator';
import { UserResponseDto } from '../../../application/dtos/user-response.dto';
import { RegisterUserHandler } from '../../../application/handlers/register-user.handler';
import { RegisterUserRequestDto } from '../dtos/register-user-request.dto';

@Controller('users')
export class UserController {
    constructor(
        private readonly registerUserHandler: RegisterUserHandler,
    ) { }

    @Public()
    @Post('register')
    async register(@Body() dto: RegisterUserRequestDto): Promise<ApiResponse<UserResponseDto>> {
        return this.registerUserHandler.handle(dto);
    }
}
