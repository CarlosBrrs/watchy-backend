export abstract class AppException extends Error {
    constructor(
        public readonly message: string,
        public readonly statusCode: number = 500,
        public readonly technicalMessage: string = '',
    ) {
        super(message);
        this.name = this.constructor.name;
    }
}
