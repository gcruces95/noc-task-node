import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";


export class ServerApp {

  public static async start() {

    console.log('Server started...');


    CronService.createJob(
      '*/3 * * * * *',
      () => {
        const url = 'https://www.google.com';
        new CheckService(
          () => console.log(`${url} is up`),
          (error) => console.log(error)
        ).excute(url);

      }
    );

  }

}