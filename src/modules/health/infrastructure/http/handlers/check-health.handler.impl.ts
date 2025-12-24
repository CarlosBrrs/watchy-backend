import { Injectable } from '@nestjs/common';
import { ApiResponse } from '@shared/application/response/api-response';
import { ResponseFactory } from '@shared/application/response/response.factory';
import { CheckHealthHandler } from '../../../application/handlers/check-health.handler';
import { CheckHealthServicePort } from '../../../application/ports/check-health.service-port';
import { HealthResponseDto } from '../dtos/health.response.dto';
import { HealthMapper } from '../mappers/health.mapper';

@Injectable()
export class CheckHealthHandlerImpl extends CheckHealthHandler {
    constructor(
        private readonly checkHealthServicePort: CheckHealthServicePort,
    ) {
        super();
    }

    handle(): ApiResponse<HealthResponseDto> {
        const result = this.checkHealthServicePort.execute();
        const dto = HealthMapper.toDto(result);
        return ResponseFactory.success(dto);
    }
}
