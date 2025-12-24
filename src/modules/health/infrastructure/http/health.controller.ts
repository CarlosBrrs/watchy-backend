import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@shared/application/response/api-response';
import { CheckHealthHandler } from '../../application/handlers/check-health.handler';
import { HealthResponseDto } from './dtos/health.response.dto';
import { Public } from '@shared/infrastructure/auth/decorators/public.decorator';

@Controller('health')
export class HealthController {
    constructor(
        private readonly checkHealthHandler: CheckHealthHandler,
    ) { }

    @Public()
    @Get()
    check(): ApiResponse<HealthResponseDto> {
        return this.checkHealthHandler.handle();
    }

    @Get('secure')
    checkSecure(): ApiResponse<HealthResponseDto> {
        return this.checkHealthHandler.handle();
    }
}
