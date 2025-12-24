import { Test, TestingModule } from '@nestjs/testing';
import { RegisterUserUseCase } from './register-user.use-case';
import { UserPersistencePort } from '../../domain/ports/user-persistence.port';
import { User, UserProps } from '../../domain/model/user.model';

describe('RegisterUserUseCase', () => {
    let useCase: RegisterUserUseCase;
    let userPersistencePort: jest.Mocked<UserPersistencePort>;

    const createMockUser = (): User => User.create({
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

    const createMockPartialProps = (): Partial<UserProps> => ({
        firstName: 'John',
        secondName: null,
        firstLastName: 'Doe',
        secondLastName: null,
        username: 'johndoe',
        email: 'john@example.com',
        phone: '+1234567890',
    });

    beforeEach(async () => {
        const mockPersistencePort = {
            save: jest.fn(),
            findByEmail: jest.fn(),
            findByUsername: jest.fn(),
            findByPhone: jest.fn(),
            findById: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RegisterUserUseCase,
                {
                    provide: UserPersistencePort,
                    useValue: mockPersistencePort,
                },
            ],
        }).compile();

        useCase = module.get<RegisterUserUseCase>(RegisterUserUseCase);
        userPersistencePort = module.get(UserPersistencePort);
    });

    it('should be defined', () => {
        expect(useCase).toBeDefined();
    });

    describe('execute', () => {
        it('should save user when all validations pass', async () => {
            const mockUser = createMockUser();
            userPersistencePort.findByEmail.mockResolvedValue(null);
            userPersistencePort.findByUsername.mockResolvedValue(null);
            userPersistencePort.findByPhone.mockResolvedValue(null);
            userPersistencePort.save.mockResolvedValue(mockUser);

            const partialProps = createMockPartialProps();
            const result = await useCase.execute(partialProps, 'password123');

            expect(userPersistencePort.findByEmail).toHaveBeenCalledWith('john@example.com');
            expect(userPersistencePort.findByUsername).toHaveBeenCalledWith('johndoe');
            expect(userPersistencePort.findByPhone).toHaveBeenCalledWith('+1234567890');
            expect(userPersistencePort.save).toHaveBeenCalled();
            expect(result).toEqual(mockUser);
        });

        it('should throw error when email already exists', async () => {
            userPersistencePort.findByEmail.mockResolvedValue(createMockUser());

            const partialProps = createMockPartialProps();
            await expect(useCase.execute(partialProps, 'password123')).rejects.toThrow('Email already registered');
            expect(userPersistencePort.save).not.toHaveBeenCalled();
        });

        it('should throw error when username already exists', async () => {
            userPersistencePort.findByEmail.mockResolvedValue(null);
            userPersistencePort.findByUsername.mockResolvedValue(createMockUser());

            const partialProps = createMockPartialProps();
            await expect(useCase.execute(partialProps, 'password123')).rejects.toThrow('Username already taken');
            expect(userPersistencePort.save).not.toHaveBeenCalled();
        });

        it('should throw error when phone already exists', async () => {
            userPersistencePort.findByEmail.mockResolvedValue(null);
            userPersistencePort.findByUsername.mockResolvedValue(null);
            userPersistencePort.findByPhone.mockResolvedValue(createMockUser());

            const partialProps = createMockPartialProps();
            await expect(useCase.execute(partialProps, 'password123')).rejects.toThrow('Phone already registered');
            expect(userPersistencePort.save).not.toHaveBeenCalled();
        });

        it('should generate unique id for each user', async () => {
            userPersistencePort.findByEmail.mockResolvedValue(null);
            userPersistencePort.findByUsername.mockResolvedValue(null);
            userPersistencePort.findByPhone.mockResolvedValue(null);
            userPersistencePort.save.mockImplementation(async (user) => user);

            const partialProps1 = createMockPartialProps();
            const partialProps2 = { ...createMockPartialProps(), email: 'other@example.com', username: 'other', phone: '+9876543210' };

            const result1 = await useCase.execute(partialProps1, 'password123');
            const result2 = await useCase.execute(partialProps2, 'password456');

            expect(result1.id).not.toEqual(result2.id);
        });

        it('should hash password', async () => {
            userPersistencePort.findByEmail.mockResolvedValue(null);
            userPersistencePort.findByUsername.mockResolvedValue(null);
            userPersistencePort.findByPhone.mockResolvedValue(null);
            userPersistencePort.save.mockImplementation(async (user) => user);

            const partialProps = createMockPartialProps();
            const result = await useCase.execute(partialProps, 'password123');

            expect(result.passwordHash).not.toEqual('password123');
            expect(result.passwordHash.length).toBeGreaterThan(0);
        });
    });
});
