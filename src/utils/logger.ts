
const isDevelopment = import.meta.env.DEV;

interface LogLevel {
  ERROR: 0;
  WARN: 1;
  INFO: 2;
  DEBUG: 3;
}

const LOG_LEVELS: LogLevel = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3,
};

const currentLogLevel = isDevelopment ? LOG_LEVELS.DEBUG : LOG_LEVELS.ERROR;

class Logger {
  private shouldLog(level: number): boolean {
    return level <= currentLogLevel;
  }

  error(...args: any[]): void {
    if (this.shouldLog(LOG_LEVELS.ERROR)) {
      console.error('[ERROR]', ...args);
    }
  }

  warn(...args: any[]): void {
    if (this.shouldLog(LOG_LEVELS.WARN)) {
      console.warn('[WARN]', ...args);
    }
  }

  info(...args: any[]): void {
    if (this.shouldLog(LOG_LEVELS.INFO)) {
      console.info('[INFO]', ...args);
    }
  }

  debug(...args: any[]): void {
    if (this.shouldLog(LOG_LEVELS.DEBUG)) {
      console.log('[DEBUG]', ...args);
    }
  }

  // For tracking analytics and errors in production
  track(event: string, data?: any): void {
    if (window.gtag && typeof window.gtag === 'function') {
      window.gtag('event', event, data);
    }
  }
}

export const logger = new Logger();
