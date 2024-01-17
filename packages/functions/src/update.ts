import { UpdateNoteSchema } from "@sst-rest-api/core/notes";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { getConnection } from "../../../database/connection";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  if (!event.pathParameters || !event.pathParameters.id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: true }),
    };
  }
  const { id } = event.pathParameters;

  const db = await getConnection();
  const body = event.body;
  const data = UpdateNoteSchema.parse(JSON.parse(body ?? ""));

  await db
    .updateTable("notes")
    .where("id", "=", id)
    .set({ ...data })
    .executeTakeFirst();

  return {
    statusCode: 200,
    body: JSON.stringify({
      id,
      ...data,
    }),
  };
};
