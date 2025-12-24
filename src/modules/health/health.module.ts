import { Module } from '@nestjs/common';
import { HealthController } from './infrastructure/http/health.controller';
import { CheckHealthServicePort } from './application/ports/check-health.service-port';
import { CheckHealthUseCase } from './application/use-cases/check-health.use-case';
import { CheckHealthHandler } from './application/handlers/check-health.handler';
import { CheckHealthHandlerImpl } from './infrastructure/http/handlers/check-health.handler.impl';

@Module({
    controllers: [HealthController],
    providers: [
        {
            provide: CheckHealthServicePort,
            useClass: CheckHealthUseCase,
        },
        {
            provide: CheckHealthHandler,
            useClass: CheckHealthHandlerImpl,
        },
    ],
})
export class HealthModule { }
