import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

import { PrismaClientKnownRequestErrorMap } from 'src/common/errors/prisma/prisma-errors.map';
import {
  isPrismaClientKnownRequestError,
  isPrismaClientRustPanicError,
  isPrismaClientUnknowRequestError,
  isPrismaClientValidationError,
} from 'src/common/typeguard/prisma/prisma.typeguard';

@Catch(
  Prisma.PrismaClientKnownRequestError,
  Prisma.PrismaClientValidationError,
  Prisma.PrismaClientRustPanicError,
  Prisma.PrismaClientUnknownRequestError,
)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctxType = host.getType();
    this.logger.error(
      `PrismaExceptionFilter caught an exception in ${ctxType} context`,
    );
    this.logger.error(exception);

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Something went wrong';

    if (isPrismaClientKnownRequestError(exception)) {
      if (!(exception.code in PrismaClientKnownRequestErrorMap)) {
        message = 'Unknown Prisma Client Error';
      } else {
        const errorCode =
          exception.code as keyof typeof PrismaClientKnownRequestErrorMap;
        message = PrismaClientKnownRequestErrorMap[errorCode].message;
        status = PrismaClientKnownRequestErrorMap[errorCode].statusCode;
      }
    }
    if (isPrismaClientUnknowRequestError(exception)) {
      message = exception.message;
    }
    if (isPrismaClientValidationError(exception)) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Please Verify Your Payload matches The Expeceted Input';
    }
    if (isPrismaClientRustPanicError(exception)) {
      message = exception.message;
    }

    // 🔹 Handle WebSocket and HTTP separately
    if (ctxType === 'http') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      response.status(status).json({ statusCode: status, message });
    } else if (ctxType === 'ws') {
      throw new WsException(message); // 🔹 Throw WebSocket exception
    }
  }
}
