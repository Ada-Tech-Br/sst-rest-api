import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { getConnection } from "../../../database/connection";
import { CreateNoteSchema, Note } from "@sst-rest-api/core/notes";
import { randomUUID } from "crypto";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const db = await getConnection();
  const body = event.body;
  const parsedBody = CreateNoteSchema.parse(JSON.parse(body ?? ""));
  const data: Note = {
    ...parsedBody,
    id: randomUUID(),
    created_at: new Date(),
  };

  await db
    .insertInto("notes")
    .values({ ...data })
    .executeTakeFirst();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
