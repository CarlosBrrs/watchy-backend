import { Module } from '@nestjs/common';
import { UserModule } from '@modules/user/user.module';
import { AuthUtilityModule } from '@shared/infrastructure/auth/auth-utility.module';
import { LoginServicePort } from './domain/ports/login.service-port';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { LoginHandler } from './application/handlers/login.handler';
import { LoginHandlerImpl } from './infrastructure/http/handlers/login.handler.impl';
import { AuthController } from './infrastructure/http/controllers/auth.controller';

@Module({
    imports: [UserModule, AuthUtilityModule],
    controllers: [AuthController],
    providers: [
        {
            provide: LoginServicePort,
            useClass: LoginUseCase,
        },
        {
            provide: LoginHandler,
            useClass: LoginHandlerImpl,
        },
    ],
})
export class AuthModule { }
