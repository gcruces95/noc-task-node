import 'dotenv/config';
import * as env from 'env-var';


export const envs = {

  PROD: env.get('PROD').required().asBool(),
  PORT: env.get('PORT').required().asPortNumber(),

  MAILER_SERVICE: env.get('MAILER_SERVICE').required().asString(),
  MAILER_EMAIL: env.get('MAILER_EMAIL').required().asEmailString(),
  MAILER_SECRET_KEY: env.get('MAILER_SECRET_KEY').required().asString(),

};