import { Api, StackContext } from "sst/constructs";

export function ExampleStack({ stack }: StackContext) {
  const api = new Api(stack, "Api", {
    routes: {
      "GET /notes": "packages/functions/src/list.handler",
      "GET /notes/{id}": "packages/functions/src/read.handler",
      "POST /notes": "packages/functions/src/create.handler",
      "PUT /notes/{id}": "packages/functions/src/update.handler",
      "DELETE /notes/{id}": "packages/functions/src/delete.handler",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
