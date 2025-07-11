export enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export interface LogEntityOptions {
  level: LogSeverityLevel;
  message: string;
  origin: string;
  createdAt?: Date;
}

export class LogEntity {

  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(options: LogEntityOptions) {
    const { level, message, origin, createdAt } = options;
    this.level = level;
    this.message = message;
    this.origin = origin;
    this.createdAt = createdAt || new Date();
  }

  static fromJson = (json: string = '{}'): LogEntity => {
    json = (json === '') ? '{}' : json;
    const { message, level, createdAt, origin } = JSON.parse(json);

    const log = new LogEntity({
      message: message,
      level: level,
      createdAt: new Date(createdAt),
      origin: origin,
    });

    return log;

  }

  static fromObject = (object: { [key: string]: any }): LogEntity => {

    const { message, level, createdAt, origin } = object;
    const log = new LogEntity({
      message: message,
      level: level,
      createdAt: createdAt,
      origin: origin,
    });
    return log;


  }


}