import { Health } from '@modules/health/domain/model/health.model';
import { HealthResponseDto } from '../dtos/health.response.dto';

export class HealthMapper {
    static toDto(model: Health): HealthResponseDto {
        const dto = new HealthResponseDto();
        dto.status = model.status;
        dto.timestamp = model.timestamp.toISOString();
        dto.version = model.version;
        return dto;
    }
}
