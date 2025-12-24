export class ApiResponse<T> {
    success: boolean;
    data: T;
    error: any;
    timestamp: string;

    constructor(success: boolean, data: T, error: any = null) {
        this.success = success;
        this.data = data;
        this.error = error;
        this.timestamp = new Date().toISOString();
    }
}
