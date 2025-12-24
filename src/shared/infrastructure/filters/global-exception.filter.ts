
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { ResponseFactory } from '@shared/application/response/response.factory';
import { ApiErrorDetails } from '@shared/domain/interfaces/api-error-details.interface';
import { AppException } from '@shared/domain/exceptions/app.exception';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(GlobalExceptionFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest<Request>();

        let statusCode: number;
        let message: string;
        let technicalMessage: string;
        let errorType: string;

        if (exception instanceof HttpException) {
            statusCode = exception.getStatus();
            const responseBody = exception.getResponse();
            message = typeof responseBody === 'object' && 'message' in responseBody
                ? (responseBody as any).message
                : exception.message;
            technicalMessage = exception.message;
            errorType = exception.constructor.name;
        } else if (exception instanceof AppException) {
            statusCode = exception.statusCode;
            message = exception.message;
            technicalMessage = exception.technicalMessage;
            errorType = exception.name;
        } else {
            statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            message = 'Internal server error';
            technicalMessage = exception instanceof Error ? exception.message : String(exception);
            errorType = 'InternalServerError';

            this.logger.error(`Critical Error: ${technicalMessage}`, (exception as Error).stack);
        }

        const errorDetails: ApiErrorDetails = {
            statusCode,
            errorType,
            message,
            technicalMessage,
            path: request.url,
        };

        const apiResponse = ResponseFactory.error(errorDetails);

        response.status(statusCode).json(apiResponse);
    }
}
