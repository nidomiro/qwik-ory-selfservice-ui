import {
  $,
  component$,
  PropFunction,
  PublicProps,
  useStore,
} from "@builder.io/qwik";
import { getNodeId, isUiNodeInputAttributes } from "@ory/integrations/ui";
import {
  KratosLoginFlowTuple,
  KratosRecoveryFlowTuple,
  KratosRegistrationFlowTuple,
  KratosSettingsFlowTuple,
  KratosVerificationFlowTuple,
} from "~/components/ory/ory-flow-tuples";
import { NodeUi } from "~/components/ory/node-ui/node-ui";
import {
  FlowUiForm,
  FlowUiFormProps,
} from "~/components/ory/flow-ui-form/flow-ui-form";
import { UiNode } from "@ory/client";

export type SupportedFlows =
  | KratosLoginFlowTuple
  | KratosRegistrationFlowTuple
  | KratosSettingsFlowTuple
  | KratosVerificationFlowTuple
  | KratosRecoveryFlowTuple;

export type FlowUiProps<TFlowTuple extends SupportedFlows> = {
  initialFlow: FlowUiFormProps<TFlowTuple>["flow"];
  onSubmit$: PropFunction<(values: TFlowTuple["formValues"]) => void>;
};

export const FlowUi = component$(
  <TFlowTuple extends SupportedFlows>({
    initialFlow,
    onSubmit$,
  }: FlowUiProps<TFlowTuple>) => {
    const flow = useStore(initialFlow);

    const calcInitialValues = (
      nodes: Array<UiNode>
    ): TFlowTuple["formValues"] => {
      return nodes.reduce((acc, currentValue) => {
        if (isUiNodeInputAttributes(currentValue.attributes)) {
          const type = currentValue.attributes.type;
          if (type !== "button" && type !== "submit") {
            acc[
              currentValue.attributes.name as keyof TFlowTuple["formValues"]
            ] = currentValue.attributes.value;
          }
        }
        return acc;
      }, {} as TFlowTuple["formValues"]);
    };

    const formValues = useStore(calcInitialValues(flow.ui.nodes), {
      recursive: true,
    });

    const handleSubmit = $(
      async (additionalValues?: Record<string, string | number | boolean>) => {
        await onSubmit$({ ...formValues, ...additionalValues });
      }
    );

    return (
      <>
        <FlowUiForm<TFlowTuple> flow={flow as PublicProps<TFlowTuple>["flow"]}>
          <>
            TODO: Add global Messages output
            {flow.ui.nodes.map((node, index) => {
              const nodeId = getNodeId(node) as keyof TFlowTuple["formValues"];
              return (
                <>
                  <NodeUi
                    key={`${nodeId as string}-${index}`}
                    node={node}
                    value={formValues[nodeId] as string}
                    onValueChanged$={(value) => {
                      formValues[nodeId] =
                        value as TFlowTuple["formValues"][keyof TFlowTuple["formValues"]];
                    }}
                    onSubmitRequested$={async (additionalValues) =>
                      await handleSubmit?.(additionalValues)
                    }
                  />
                </>
              );
            })}
          </>
        </FlowUiForm>
      </>
    );
  }
);
