import { Module } from '@nestjs/common';
import { UserPersistencePort } from './domain/ports/user-persistence.port';
import { UserPersistenceAdapter } from './infrastructure/persistence/adapters/user-persistence.adapter';
import { UserRepository } from './infrastructure/persistence/repositories/user.repository';
import { RegisterUserServicePort } from './domain/ports/register-user.service-port';
import { RegisterUserUseCase } from './application/use-cases/register-user.use-case';
import { RegisterUserHandler } from './application/handlers/register-user.handler';
import { RegisterUserHandlerImpl } from './infrastructure/http/handlers/register-user.handler.impl';
import { UserController } from './infrastructure/http/controllers/user.controller';

@Module({
    controllers: [UserController],
    providers: [
        UserRepository,
        {
            provide: UserPersistencePort,
            useClass: UserPersistenceAdapter,
        },
        {
            provide: RegisterUserServicePort,
            useClass: RegisterUserUseCase,
        },
        {
            provide: RegisterUserHandler,
            useClass: RegisterUserHandlerImpl,
        },
    ],
    exports: [UserPersistencePort],
})
export class UserModule { }
