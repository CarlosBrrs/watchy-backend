import { User, UserProps } from '../../../domain/model/user.model';
import { UserEntity } from '../entities/user.entity';

export class UserEntityMapper {
    static toEntity(domain: User): UserEntity {
        const entity = new UserEntity();
        entity.id = domain.id;
        entity.firstName = domain.firstName;
        entity.secondName = domain.secondName;
        entity.firstLastName = domain.firstLastName;
        entity.secondLastName = domain.secondLastName;
        entity.username = domain.username;
        entity.email = domain.email;
        entity.phone = domain.phone;
        entity.passwordHash = domain.passwordHash;
        entity.createdAt = domain.createdAt!;
        entity.updatedAt = domain.updatedAt!;
        return entity;
    }

    static toDomain(entity: UserEntity): User {
        return User.create({
            id: entity.id,
            firstName: entity.firstName,
            secondName: entity.secondName,
            firstLastName: entity.firstLastName,
            secondLastName: entity.secondLastName,
            username: entity.username,
            email: entity.email,
            phone: entity.phone,
            passwordHash: entity.passwordHash,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        });
    }
}
