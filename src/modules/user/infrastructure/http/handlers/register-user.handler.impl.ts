import { Injectable } from '@nestjs/common';
import { ApiResponse } from '@shared/application/response/api-response';
import { ResponseFactory } from '@shared/application/response/response.factory';
import { RegisterUserServicePort } from '../../../domain/ports/register-user.service-port';
import { UserResponseDto } from '../../../application/dtos/user-response.dto';
import { RegisterUserHandler } from '../../../application/handlers/register-user.handler';
import { RegisterUserRequestDto } from '../dtos/register-user-request.dto';
import { UserServiceMapper } from '../mappers/user-service.mapper';

@Injectable()
export class RegisterUserHandlerImpl extends RegisterUserHandler {
    constructor(
        private readonly registerUserServicePort: RegisterUserServicePort,
    ) {
        super();
    }

    async handle(dto: RegisterUserRequestDto): Promise<ApiResponse<UserResponseDto>> {
        const partialProps = UserServiceMapper.toPartialProps(dto);
        const savedUser = await this.registerUserServicePort.execute(partialProps, dto.password);
        const responseDto = UserServiceMapper.toResponseDto(savedUser);
        return ResponseFactory.success(responseDto);
    }
}
