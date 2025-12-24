
export interface ApiErrorDetails {
    statusCode: number;
    errorType: string;
    message: string;
    technicalMessage: string;
    path: string;
}
