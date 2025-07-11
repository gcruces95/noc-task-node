import { EmailService } from "../../../presentation/email/email-service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";


interface SendEmailLogsUseCase {
  excute(to: string | string[]): Promise<boolean>
}

export class SendEmailLogs implements SendEmailLogsUseCase {

  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository,
  ) { }

  async excute(to: string | string[]): Promise<boolean> {

    try {

      const sent = await this.emailService.sendEmalWithFileSystemLogs(to);
      if (!sent) {
        throw new Error('Error log not sent');
      }

      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: `Logs sent correctly`,
        origin: 'send-email-logs.ts',
      })
      this.logRepository.saveLog(log);

      return true;

    } catch (error) {

      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: `${error}`,
        origin: 'send-email-logs.ts',
      })
      this.logRepository.saveLog(log);

      return false;

    }

  }



}