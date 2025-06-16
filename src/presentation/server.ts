import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasources";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const fsLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource(),
);

export class ServerApp {

  public static async start() {

    console.log(`Server started on port ${envs.PORT}`);


    CronService.createJob(
      '*/3 * * * * *',
      () => {
        const url = 'https://www.google.com';
        new CheckService(
          fsLogRepository,
          () => console.log(`${url} is up`),
          (error) => console.log(error)
        ).excute(url);

      }
    );

  }

}