import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

export abstract class LogRepository {

  abstract saveLog(newLog: LogEntity): Promise<void>;
  abstract getLogs(severityLevel?: LogSeverityLevel): Promise<LogEntity[]>;

}