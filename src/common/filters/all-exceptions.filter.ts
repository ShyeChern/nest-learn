import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

/**
 * Class to catch all unhandled exception
 */
@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.

    if (!(exception instanceof HttpException)) {
      // Unhandled exception
      const ctx = host.switchToHttp();
      const request = ctx.getRequest();
      const log = {
        ip: request.ip,
        from: request.hostname,
        path: request.path,
        method: request.method,
        timestamp: new Date().toISOString(),
        error: exception,
      };
      console.log('log error', log);
      // for custom response
      // const { httpAdapter } = this.httpAdapterHost;
      // httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
    super.catch(exception, host);
  }
}
