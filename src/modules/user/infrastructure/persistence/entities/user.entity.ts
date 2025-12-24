export class UserEntity {
    id: string;
    firstName: string;
    secondName: string | null;
    firstLastName: string;
    secondLastName: string | null;
    username: string;
    email: string;
    phone: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
}
