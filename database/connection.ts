import {
  Generated,
  Insertable,
  Kysely,
  MysqlDialect,
  Selectable,
  Updateable,
} from "kysely";
import { createPool } from "mysql2";

export interface Database {
  notes: NotesTable;
}

export interface NotesTable {
  id: Generated<string>;
  user_id: string;
  content: string;
  created_at: Generated<Date>;
}

export type UserRow = Selectable<NotesTable>;
export type InsertableUserRow = Insertable<NotesTable>;
export type UpdateableUserRow = Updateable<NotesTable>;

export async function getConnection() {
  const db = new Kysely<Database>({
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

  return db;
}
