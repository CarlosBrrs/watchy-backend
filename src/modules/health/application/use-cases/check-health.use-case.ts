import { Injectable } from '@nestjs/common';
import { Health } from '../../domain/model/health.model';
import { CheckHealthServicePort } from '../ports/check-health.service-port';

@Injectable()
export class CheckHealthUseCase extends CheckHealthServicePort {
    execute(): Health {
        return new Health('ok', new Date(), '0.0.1');
    }
}
