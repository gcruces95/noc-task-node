
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";

interface CheckServiceUseCase {
  excute(url: string): Promise<boolean>
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase {

  constructor(

    private readonly logRepository: LogRepository,
    private readonly successCallback?: SuccessCallback,
    private readonly errorCallback?: ErrorCallback

  ) { }

  public async excute(url: string): Promise<boolean> {

    try {

      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on checks service: ${url}`);
      }

      const log = new LogEntity({
        message: `Service ${url} working`,
        level: LogSeverityLevel.low,
        origin: 'check-service.ts',
      });
      this.logRepository.saveLog(log);

      this.successCallback && this.successCallback();

      return true;
    }
    catch (error) {

      const errorMessage = `Servise ${url} not working ${error}`;
      const log = new LogEntity({
        message: errorMessage,
        level: LogSeverityLevel.high,
        origin: 'check-service.ts',
      });
      this.logRepository.saveLog(log);

      this.errorCallback && this.errorCallback(errorMessage);

      return false;

    }

  }


}
