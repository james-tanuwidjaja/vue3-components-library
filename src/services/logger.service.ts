export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LEVEL_ORDER: Record<LogLevel, number> = { debug: 0, info: 1, warn: 2, error: 3 };

export interface LoggerOptions {
  /** Minimum level to emit. Defaults to `'info'`. */
  level?: LogLevel;
  /** Prefix prepended to every message. Defaults to `'[jt]'`. */
  prefix?: string;
  /** Disable all output. Defaults to `false`. */
  silent?: boolean;
}

/** Small leveled logger used internally; exported so consumers can reuse the pattern. */
export class LoggerService {
  private level: LogLevel;
  private prefix: string;
  private silent: boolean;

  constructor(options: LoggerOptions = {}) {
    this.level = options.level ?? 'info';
    this.prefix = options.prefix ?? '[jt]';
    this.silent = options.silent ?? false;
  }

  private shouldLog(level: LogLevel): boolean {
    return !this.silent && LEVEL_ORDER[level] >= LEVEL_ORDER[this.level];
  }

  debug(...args: unknown[]): void {
    if (this.shouldLog('debug')) console.debug(this.prefix, ...args);
  }

  info(...args: unknown[]): void {
    if (this.shouldLog('info')) console.info(this.prefix, ...args);
  }

  warn(...args: unknown[]): void {
    if (this.shouldLog('warn')) console.warn(this.prefix, ...args);
  }

  error(...args: unknown[]): void {
    if (this.shouldLog('error')) console.error(this.prefix, ...args);
  }
}

/** Default shared logger instance. */
export const logger = new LoggerService();
