import { Kysely, sql } from "kysely";

export async function up(db) {
  await db.schema
    .createTable("notes")
    .addColumn("id", "varchar(36)", (col) =>
      col.primaryKey().defaultTo(sql`( uuid() )`)
    )
    .addColumn("user_id", "varchar(36)")
    .addColumn("content", "text")
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`NOW()`))
    .execute();
}

export async function down(db) {
  await db.schema.dropTable("notes").execute();
}
