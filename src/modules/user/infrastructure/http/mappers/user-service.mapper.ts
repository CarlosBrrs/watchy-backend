import { User, UserProps } from '../../../domain/model/user.model';
import { UserResponseDto } from '../../../application/dtos/user-response.dto';
import { RegisterUserRequestDto } from '../dtos/register-user-request.dto';

export class UserServiceMapper {
    static toResponseDto(domain: User): UserResponseDto {
        const dto = new UserResponseDto();
        dto.id = domain.id;
        dto.firstName = domain.firstName;
        dto.secondName = domain.secondName;
        dto.firstLastName = domain.firstLastName;
        dto.secondLastName = domain.secondLastName;
        dto.username = domain.username;
        dto.email = domain.email;
        dto.phone = domain.phone;
        dto.createdAt = domain.createdAt?.toISOString() ?? '';
        return dto;
    }

    static toPartialProps(dto: RegisterUserRequestDto): Partial<UserProps> {
        return {
            firstName: dto.firstName,
            secondName: dto.secondName ?? null,
            firstLastName: dto.firstLastName,
            secondLastName: dto.secondLastName ?? null,
            username: dto.username,
            email: dto.email,
            phone: dto.phone,
        };
    }
}
