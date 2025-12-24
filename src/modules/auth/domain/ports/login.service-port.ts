import { AuthTokenResponseDto } from '../../application/dtos/auth-token-response.dto';

export abstract class LoginServicePort {
    abstract execute(identifier: string, password: string): Promise<AuthTokenResponseDto>;
}
