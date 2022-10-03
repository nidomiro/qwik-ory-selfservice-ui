import { component$, useClientEffect$, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { KratosClient } from "~/components/ory/kratos/kratos-client";
import { Typography } from "~/components/typography/typograpy";
import { Link } from "~/components/link/link";
import { FlowUi } from "~/components/ory/flow-ui/flow-ui";
import { KratosLoginFlowTuple } from "~/components/ory/ory-flow-tuples";
import { SelfServiceLoginFlow } from "@ory/client";

export default component$(() => {
  const state = useStore({flow: null as SelfServiceLoginFlow | null})

  useClientEffect$(async (ctx) => {
    ctx.track(state, 'flow')

    if(state.flow == null) {
      const result = await KratosClient.initializeSelfServiceLoginFlowForBrowsers();
      state.flow = result.data
    }

  }, {eagerness: 'load'})


  return (
    <div>
      <Typography variant="title">Login</Typography>
      <Link href="/">Back to Index</Link>
      {
        state.flow == null? () => <div>Loading...</div> : (
          <>
            <FlowUi<KratosLoginFlowTuple> initialFlow={state.flow} onSubmit$={ async (values) => {
              console.log(`values`, values)
              // TODO: add flowId to url
              const loginResult = await KratosClient.submitSelfServiceLoginFlow(state.flow?.id ?? '', values)
              console.log(`loginResult`, loginResult.data)
            }} />
          </>
        )
      }
    </div>
  );
});

export const head: DocumentHead = {
  title: "Login",
};
