import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repositories/log.repository";



export class LogRepositoryImpl implements LogRepository {

  constructor(
    private readonly logDatasource: LogDatasource
  ) { }

  async saveLog(newLog: LogEntity): Promise<void> {

    return this.logDatasource.saveLog(newLog);
  }
  async getLogs(severityLevel?: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDatasource.getLogs(severityLevel);
  }

}