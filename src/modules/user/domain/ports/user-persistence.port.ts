import { User } from '../model/user.model';

export abstract class UserPersistencePort {
    abstract save(user: User): Promise<User>;
    abstract findByEmail(email: string): Promise<User | null>;
    abstract findByUsername(username: string): Promise<User | null>;
    abstract findByPhone(phone: string): Promise<User | null>;
    abstract findById(id: string): Promise<User | null>;
}
