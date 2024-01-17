import * as path from "path";
import { createPool } from "mysql2";
import { promises as fs } from "fs";
import { Kysely, Migrator, MysqlDialect, FileMigrationProvider } from "kysely";

export async function migrateDown() {
  const db = new Kysely({
    dialect: new MysqlDialect({
      pool: createPool({
        host: "localhost",
        database: "sst",
        port: 3306,
        user: "root",
        password: "password",
      }),
    }),
  });

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      migrationFolder: path.join(process.cwd(), "database", "migrations"),
      fs,
      path,
    }),
  });

  const { error, results } = await migrator.migrateDown();

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === "Error") {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error("failed to run `migrateToLatest`");
    console.error(error);
  }
}

migrateDown();
