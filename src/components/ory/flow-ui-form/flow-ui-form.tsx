import { component$, Slot } from "@builder.io/qwik";
import {
  KratosLoginFlowTuple,
  KratosRecoveryFlowTuple,
  KratosRegistrationFlowTuple,
  KratosSettingsFlowTuple,
  KratosVerificationFlowTuple,
} from "~/components/ory/ory-flow-tuples";

export type SupportedFlows =
  | KratosLoginFlowTuple
  | KratosRegistrationFlowTuple
  | KratosSettingsFlowTuple
  | KratosVerificationFlowTuple
  | KratosRecoveryFlowTuple;

export type FlowUiFormProps<TFlowTuple extends SupportedFlows> = {
  flow: TFlowTuple["flow"];
};

export const FlowUiForm = component$(
  <TFlowTuple extends SupportedFlows>({ flow }: FlowUiFormProps<TFlowTuple>) => {

    return <>
      <form
        className="form-control w-full max-w-xs"
        action={flow.ui.action}
        method={flow.ui.method}
        preventdefault:submit
        onsubmit$={() => {}}
      >
        <Slot/>
      </form>
    </>;
  }
);
