import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { SALT_ROUNDS } from '@shared/domain/constants/security.constants';
import { User, UserProps } from '../../domain/model/user.model';
import { UserPersistencePort } from '../../domain/ports/user-persistence.port';
import { RegisterUserServicePort } from '../../domain/ports/register-user.service-port';
import { UserAlreadyExistsException } from '../../domain/exceptions/user.exception';

@Injectable()
export class RegisterUserUseCase extends RegisterUserServicePort {
    constructor(private readonly userPersistencePort: UserPersistencePort) {
        super();
    }

    async execute(partialProps: Partial<UserProps>, password: string): Promise<User> {
        const id = uuidv4();
        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

        const user = User.create({
            id,
            firstName: partialProps.firstName!,
            secondName: partialProps.secondName ?? null,
            firstLastName: partialProps.firstLastName!,
            secondLastName: partialProps.secondLastName ?? null,
            username: partialProps.username!,
            email: partialProps.email!,
            phone: partialProps.phone!,
            passwordHash,
            createdAt: null,
            updatedAt: null,
        });

        await this.validateUniqueness(user);

        return this.userPersistencePort.save(user);
    }

    private async validateUniqueness(user: User): Promise<void> {
        const existingEmail = await this.userPersistencePort.findByEmail(user.email);
        if (existingEmail) {
            throw new UserAlreadyExistsException('Email', user.email);
        }

        const existingUsername = await this.userPersistencePort.findByUsername(user.username);
        if (existingUsername) {
            throw new UserAlreadyExistsException('Username', user.username);
        }

        const existingPhone = await this.userPersistencePort.findByPhone(user.phone);
        if (existingPhone) {
            throw new UserAlreadyExistsException('Phone', user.phone);
        }
    }
}
