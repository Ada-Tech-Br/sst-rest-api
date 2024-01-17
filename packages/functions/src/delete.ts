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

  const { numDeletedRows } = await db
    .deleteFrom("notes")
    .where("id", "=", id)
    .executeTakeFirst();

  if (Number(numDeletedRows) === 0) {
    return {
      statusCode: 404,
    };
  }

  return {
    statusCode: 204,
  };
};
