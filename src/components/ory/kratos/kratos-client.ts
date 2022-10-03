import { Configuration, V0alpha2Api } from "@ory/client";


export const KratosClient = new V0alpha2Api(new Configuration({
  basePath: 'http://localhost:4000/.ory'
}))