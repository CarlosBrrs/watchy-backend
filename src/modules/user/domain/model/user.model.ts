export interface UserProps {
    id: string;
    firstName: string;
    secondName: string | null;
    firstLastName: string;
    secondLastName: string | null;
    username: string;
    email: string;
    phone: string;
    passwordHash: string;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export class User {
    readonly id: string;
    readonly firstName: string;
    readonly secondName: string | null;
    readonly firstLastName: string;
    readonly secondLastName: string | null;
    readonly username: string;
    readonly email: string;
    readonly phone: string;
    readonly passwordHash: string;
    readonly createdAt: Date | null;
    readonly updatedAt: Date | null;

    private constructor(props: UserProps) {
        this.id = props.id;
        this.firstName = props.firstName;
        this.secondName = props.secondName;
        this.firstLastName = props.firstLastName;
        this.secondLastName = props.secondLastName;
        this.username = props.username;
        this.email = props.email;
        this.phone = props.phone;
        this.passwordHash = props.passwordHash;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }

    static create(props: UserProps): User {
        return new User(props);
    }

    withTimestamps(createdAt: Date | null, updatedAt: Date): User {
        return new User({
            ...this.toProps(),
            createdAt: createdAt ?? this.createdAt,
            updatedAt,
        });
    }

    private toProps(): UserProps {
        return {
            id: this.id,
            firstName: this.firstName,
            secondName: this.secondName,
            firstLastName: this.firstLastName,
            secondLastName: this.secondLastName,
            username: this.username,
            email: this.email,
            phone: this.phone,
            passwordHash: this.passwordHash,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
