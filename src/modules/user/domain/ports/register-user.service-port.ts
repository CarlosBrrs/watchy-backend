import { UserProps } from '../../domain/model/user.model';
import { User } from '../../domain/model/user.model';

export abstract class RegisterUserServicePort {
    abstract execute(partialProps: Partial<UserProps>, password: string): Promise<User>;
}
