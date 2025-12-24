import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository {
    // In-memory storage (will be replaced by TypeORM repository)
    private readonly storage: Map<string, UserEntity> = new Map();

    async save(entity: UserEntity): Promise<UserEntity> {
        this.storage.set(entity.id, entity);
        return entity;
    }

    async findById(id: string): Promise<UserEntity | null> {
        return this.storage.get(id) || null;
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        for (const entity of this.storage.values()) {
            if (entity.email === email) {
                return entity;
            }
        }
        return null;
    }

    async findByUsername(username: string): Promise<UserEntity | null> {
        for (const entity of this.storage.values()) {
            if (entity.username === username) {
                return entity;
            }
        }
        return null;
    }

    async findByPhone(phone: string): Promise<UserEntity | null> {
        for (const entity of this.storage.values()) {
            if (entity.phone === phone) {
                return entity;
            }
        }
        return null;
    }
}
