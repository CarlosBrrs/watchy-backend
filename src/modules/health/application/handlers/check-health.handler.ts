import { ApiResponse } from '@shared/application/response/api-response';
import { HealthResponseDto } from '../../infrastructure/http/dtos/health.response.dto';

export abstract class CheckHealthHandler {
    abstract handle(): ApiResponse<HealthResponseDto>;
}
