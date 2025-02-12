import { AppLogger } from '../logger/logger.service';

export abstract class AbstractResolver<S> {
  private readonly CLASS_NAME = this.constructor.name;
  private readonly _logger: AppLogger;

  constructor(
    protected readonly service: S,
    appLogger: AppLogger,
  ) {
    this._logger = appLogger;
  }

  protected get logger() {
    return {
      debug: (message: string) => this._logger.debug(message, this.CLASS_NAME),
      error: (message: string) => this._logger.error(message, this.CLASS_NAME),
      log: (message: string) => this._logger.log(message, this.CLASS_NAME),
      verbose: (message: string) =>
        this._logger.verbose(message, this.CLASS_NAME),
      warn: (message: string) => this._logger.warn(message, this.CLASS_NAME),
    };
  }
}
