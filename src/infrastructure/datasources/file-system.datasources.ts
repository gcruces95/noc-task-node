import fs from 'fs';
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";



export class FileSystemDatasource extends LogDatasource {

  private readonly logPath = 'logs/';
  private readonly allLogsPath = 'logs/logs-all.log';
  private readonly lowLogsPath = 'logs/logs-low.log';
  private readonly mediumLogsPath = 'logs/logs-medium.log';
  private readonly highLogsPath = 'logs/logs-high.log';

  constructor() {
    super();
    this.createLogsFiles();
  }

  private createLogsFiles = () => {

    if (!fs.existsSync(this.logPath)) fs.mkdirSync(this.logPath);

    [
      this.allLogsPath,
      this.lowLogsPath,
      this.mediumLogsPath,
      this.highLogsPath
    ].forEach(path => {
      if (!fs.existsSync(path)) fs.writeFileSync(path, '');
    });

  }

  async saveLog(newLog: LogEntity): Promise<void> {

    const losAsJson = `${JSON.stringify(newLog)}\n`;

    fs.appendFileSync(this.allLogsPath, losAsJson);

    switch (newLog.level) {
      case LogSeverityLevel.low:
        fs.appendFileSync(this.lowLogsPath, losAsJson);
        break;
      case LogSeverityLevel.medium:
        fs.appendFileSync(this.mediumLogsPath, losAsJson);
        break;
      case LogSeverityLevel.high:
        fs.appendFileSync(this.highLogsPath, losAsJson);
        break;
    }
  }

  private getLogsFromFile = (path: string): LogEntity[] => {

    const content = fs.readFileSync(path, 'utf-8');

    if (content === '') return [];

    const logs = content
      .split('\n')
      .filter(line => line.trim() !== '') // Filtra líneas vacías
      .map(LogEntity.fromJson);

    return logs;
  }

  async getLogs(severityLevel?: LogSeverityLevel): Promise<LogEntity[]> {
    if (!severityLevel) {
      return this.getLogsFromFile(this.allLogsPath);
    }

    switch (severityLevel) {
      case LogSeverityLevel.low:
        return this.getLogsFromFile(this.lowLogsPath);
      case LogSeverityLevel.medium:
        return this.getLogsFromFile(this.mediumLogsPath);
      case LogSeverityLevel.high:
        return this.getLogsFromFile(this.highLogsPath);
      default:
        throw new Error(`${severityLevel} is not a valid severity level`);
    }
  }

  async getAllLogs(): Promise<LogEntity[]> {
    return this.getLogsFromFile(this.allLogsPath);
  }


}