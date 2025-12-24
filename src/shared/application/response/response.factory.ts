import { ApiResponse } from './api-response';
import { ApiErrorDetails } from '@shared/domain/interfaces/api-error-details.interface';

export class ResponseFactory {
    static success<T>(data: T): ApiResponse<T> {
        return new ApiResponse<T>(true, data, null);
    }

    static error<T>(error: ApiErrorDetails): ApiResponse<T> {
        return new ApiResponse<T>(false, null as unknown as T, error);
    }
}
