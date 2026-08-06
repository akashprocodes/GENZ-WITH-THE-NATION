/**
 * Base Application Error
 * Allows us to distinguish between trusted operational errors and unknown programming errors.
 */
export class ApplicationError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Storage-specific errors (e.g., Drive, S3, R2)
 */
export class StorageError extends ApplicationError {
  constructor(message: string, statusCode: number = 502) {
    super(message, statusCode);
  }
}

/**
 * Database-specific errors (e.g., Sheets, Postgres, MongoDB)
 */
export class DatabaseError extends ApplicationError {
  constructor(message: string, statusCode: number = 502) {
    super(message, statusCode);
  }
}

/**
 * Authentication & Authorization errors
 */
export class AuthenticationError extends ApplicationError {
  constructor(message: string, statusCode: number = 401) {
    super(message, statusCode);
  }
}

/**
 * Represents raw underlying Provider errors (like Google API) safely mapped to our system
 */
export class ProviderApiError extends ApplicationError {
  constructor(message: string, statusCode: number = 502) {
    super(message, statusCode);
  }
}
