import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { LoginUseCase } from './login.use-case';
import { UserPersistencePort } from '@modules/user/domain/ports/user-persistence.port';
import { User } from '@modules/user/domain/model/user.model';

jest.mock('bcrypt');

describe('LoginUseCase', () => {
    let useCase: LoginUseCase;
    let userPersistencePort: jest.Mocked<UserPersistencePort>;
    let jwtService: jest.Mocked<JwtService>;
    let configService: jest.Mocked<ConfigService>;

    const mockUser = User.create({
        id: 'test-uuid',
        firstName: 'John',
        secondName: null,
        firstLastName: 'Doe',
        secondLastName: null,
        username: 'johndoe',
        email: 'john@example.com',
        phone: '+1234567890',
        passwordHash: 'hashedPassword',
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    beforeEach(async () => {
        const mockPersistencePort = {
            save: jest.fn(),
            findByEmail: jest.fn(),
            findByUsername: jest.fn(),
            findByPhone: jest.fn(),
            findById: jest.fn(),
        };

        const mockJwtService = {
            sign: jest.fn(),
        };

        const mockConfigService = {
            get: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                LoginUseCase,
                { provide: UserPersistencePort, useValue: mockPersistencePort },
                { provide: JwtService, useValue: mockJwtService },
                { provide: ConfigService, useValue: mockConfigService },
            ],
        }).compile();

        useCase = module.get<LoginUseCase>(LoginUseCase);
        userPersistencePort = module.get(UserPersistencePort);
        jwtService = module.get(JwtService);
        configService = module.get(ConfigService);
    });

    it('should be defined', () => {
        expect(useCase).toBeDefined();
    });

    describe('execute', () => {
        it('should return token when credentials are valid (email)', async () => {
            userPersistencePort.findByEmail.mockResolvedValue(mockUser);
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);
            jwtService.sign.mockReturnValue('mock-jwt-token');
            configService.get.mockReturnValue(3600);

            const result = await useCase.execute('john@example.com', 'password123');

            expect(result.accessToken).toBe('mock-jwt-token');
            expect(result.tokenType).toBe('Bearer');
            expect(result.expiresIn).toBe(3600);
        });

        it('should return token when credentials are valid (username)', async () => {
            userPersistencePort.findByEmail.mockResolvedValue(null);
            userPersistencePort.findByUsername.mockResolvedValue(mockUser);
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);
            jwtService.sign.mockReturnValue('mock-jwt-token');
            configService.get.mockReturnValue(3600);

            const result = await useCase.execute('johndoe', 'password123');

            expect(result.accessToken).toBe('mock-jwt-token');
        });

        it('should throw error when user not found', async () => {
            userPersistencePort.findByEmail.mockResolvedValue(null);
            userPersistencePort.findByUsername.mockResolvedValue(null);

            await expect(useCase.execute('unknown@example.com', 'password123'))
                .rejects.toThrow('Invalid credentials');
        });

        it('should throw error when password is invalid', async () => {
            userPersistencePort.findByEmail.mockResolvedValue(mockUser);
            (bcrypt.compare as jest.Mock).mockResolvedValue(false);

            await expect(useCase.execute('john@example.com', 'wrongpassword'))
                .rejects.toThrow('Invalid credentials');
        });
    });
});
