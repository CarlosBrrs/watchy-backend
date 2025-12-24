
import { AppException } from '@shared/domain/exceptions/app.exception';
import { HttpStatus } from '@nestjs/common';

export class UserAlreadyExistsException extends AppException {
    constructor(field: string, value: string) {
        super(
            `${field} '${value}' is already registered`,
            HttpStatus.CONFLICT,
            `Conflict detected: User with ${field} '${value}' already exists`
        );
    }
}

export class UserNotFoundException extends AppException {
    constructor(field: string, value: string) {
        super(
            `User with ${field} '${value}' not found`,
            HttpStatus.NOT_FOUND,
            `User lookup failed: No user found with ${field} '${value}'`
        );
    }
}
