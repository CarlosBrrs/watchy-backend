import { Injectable } from '@nestjs/common';
import { User } from '../../../domain/model/user.model';
import { UserPersistencePort } from '../../../domain/ports/user-persistence.port';
import { UserEntityMapper } from '../mappers/user-entity.mapper';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserPersistenceAdapter extends UserPersistencePort {
    constructor(private readonly userRepository: UserRepository) {
        super();
    }

    async save(user: User): Promise<User> {
        const now = new Date();
        const userWithTimestamps = user.withTimestamps(user.createdAt, now);

        const entity = UserEntityMapper.toEntity(userWithTimestamps);
        const savedEntity = await this.userRepository.save(entity);
        return UserEntityMapper.toDomain(savedEntity);
    }

    async findByEmail(email: string): Promise<User | null> {
        const entity = await this.userRepository.findByEmail(email);
        return entity ? UserEntityMapper.toDomain(entity) : null;
    }

    async findByUsername(username: string): Promise<User | null> {
        const entity = await this.userRepository.findByUsername(username);
        return entity ? UserEntityMapper.toDomain(entity) : null;
    }

    async findByPhone(phone: string): Promise<User | null> {
        const entity = await this.userRepository.findByPhone(phone);
        return entity ? UserEntityMapper.toDomain(entity) : null;
    }

    async findById(id: string): Promise<User | null> {
        const entity = await this.userRepository.findById(id);
        return entity ? UserEntityMapper.toDomain(entity) : null;
    }
}
