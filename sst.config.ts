import { SSTConfig } from "sst";
import { ExampleStack } from "./stacks/ExampleStack";

export default {
  config(_input) {
    return {
      name: "sst-rest-api",
      region: "us-east-1",
      profile: "letscode",
    };
  },
  stacks(app) {
    app.stack(ExampleStack);
  },
} satisfies SSTConfig;
