import { defineConfig } from 'kysely-ctl';
import postgres from 'postgres';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      RR_DATABASE_URL: string;
    }
  }
}

export default defineConfig({
  dialect: 'postgres',
  dialectConfig: {
    postgres: postgres(process.env.RR_DATABASE_URL),
  },
  migrations: {
    migrationFolder: './migrations',
  },
});
