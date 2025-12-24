import { Health } from '../../domain/model/health.model';

export abstract class CheckHealthServicePort {
    abstract execute(): Health;
}
