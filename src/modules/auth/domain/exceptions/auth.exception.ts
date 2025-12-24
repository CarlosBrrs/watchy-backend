
import { AppException } from '@shared/domain/exceptions/app.exception';
import { HttpStatus } from '@nestjs/common';

export class InvalidCredentialsException extends AppException {
    constructor() {
        super(
            'Invalid credentials',
            HttpStatus.UNAUTHORIZED,
            'Login failed: Password mismatch or user not found'
        );
    }
}
