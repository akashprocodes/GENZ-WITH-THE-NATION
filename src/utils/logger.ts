/**
 * Standardized Logger Interface.
 * Centralizes logging to ensure structured output (JSON in production)
 * and makes it easy to swap out the logging backend (e.g., Datadog, Winston, Pino) later.
 */
export interface ILogger {
  info(message: string, meta?: any): void;
  error(message: string, error?: any): void;
  warn(message: string, meta?: any): void;
  debug(message: string, meta?: any): void;
}

export const logger: ILogger = {
  info: (message, meta) => {
    console.log(JSON.stringify({ level: 'info', message, meta, timestamp: new Date().toISOString() }));
  },
  error: (message, error) => {
    const errorDetails = error instanceof Error ? { message: error.message, stack: error.stack } : error;
    console.error(JSON.stringify({ level: 'error', message, error: errorDetails, timestamp: new Date().toISOString() }));
  },
  warn: (message, meta) => {
    console.warn(JSON.stringify({ level: 'warn', message, meta, timestamp: new Date().toISOString() }));
  },
  debug: (message, meta) => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(JSON.stringify({ level: 'debug', message, meta, timestamp: new Date().toISOString() }));
    }
  },
};
