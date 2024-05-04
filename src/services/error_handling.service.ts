import { Injectable } from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/library';
import { PRISMA_ERRORS } from 'src/constants/error';

export declare type PrismaError =
  | PrismaClientKnownRequestError
  | PrismaClientUnknownRequestError;

@Injectable()
export class ErrorHandlingService {
  private logError(error: string): void {
    console.log('---------------------------------------------------------');
    console.log('LOGGED ERROR: ' + error);
    console.log('---------------------------------------------------------');
  }
  // Use this method to handle any prisma errors
  public handlePrisma(error: PrismaError) {
    console.log(error);
    if (error instanceof PrismaClientKnownRequestError) {
      return this.handleKnownPrisma(error);
    } else if (error instanceof PrismaClientUnknownRequestError) {
      return this.handleUnknowPrisma(error);
    }

    throw error;
  }

  private handleUnknowPrisma(error: PrismaClientUnknownRequestError): string {
    this.logError(error.message);
    return error.message;
  }

  // If your error code is not being handled by this function, add a correspondent string to the error a
  private handleKnownPrisma(error: PrismaClientKnownRequestError): string {
    const columnsError: string[] = error.meta.target as string[];
    let errorString;
    if (PRISMA_ERRORS.hasOwnProperty(error.code)) {
      errorString = PRISMA_ERRORS[error.code] + columnsError.join(', ');
    }

    this.logError(errorString);
    return errorString;
  }
}
