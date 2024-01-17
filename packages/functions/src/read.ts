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
  const note = await db
    .selectFrom("notes")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirst();

  return note
    ? {
        statusCode: 200,
        body: JSON.stringify(note),
      }
    : {
        statusCode: 404,
        body: JSON.stringify({ error: true }),
      };
};
