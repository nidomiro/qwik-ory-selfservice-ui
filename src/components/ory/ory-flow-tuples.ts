import {
  SelfServiceLoginFlow,
  SelfServiceRecoveryFlow,
  SelfServiceRegistrationFlow,
  SelfServiceSettingsFlow,
  SelfServiceVerificationFlow,
  SubmitSelfServiceLoginFlowBody,
  SubmitSelfServiceRecoveryFlowBody,
  SubmitSelfServiceRegistrationFlowBody,
  SubmitSelfServiceSettingsFlowBody,
  SubmitSelfServiceVerificationFlowBody,
} from "@ory/client";

export type KratosLoginFlowTuple = {
  type: "login";
  flow: SelfServiceLoginFlow;
  formValues: SubmitSelfServiceLoginFlowBody;
};

export type KratosRegistrationFlowTuple = {
  type: "registration";
  flow: SelfServiceRegistrationFlow;
  formValues: SubmitSelfServiceRegistrationFlowBody;
};

export type KratosSettingsFlowTuple = {
  type: "settings";
  flow: SelfServiceSettingsFlow;
  formValues: SubmitSelfServiceSettingsFlowBody;
};

export type KratosVerificationFlowTuple = {
  type: "verification";
  flow: SelfServiceVerificationFlow;
  formValues: SubmitSelfServiceVerificationFlowBody;
};

export type KratosRecoveryFlowTuple = {
  type: "recovery";
  flow: SelfServiceRecoveryFlow;
  formValues: SubmitSelfServiceRecoveryFlowBody;
};
