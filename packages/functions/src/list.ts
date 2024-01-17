import { getConnection } from "../../../database/connection";

export async function handler() {
  const db = await getConnection();
  const notes = await db.selectFrom("notes").selectAll().execute();
  return {
    statusCode: 200,
    body: JSON.stringify(notes),
  };
}
