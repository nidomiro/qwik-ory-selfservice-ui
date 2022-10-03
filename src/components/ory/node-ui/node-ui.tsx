import { Component, component$, PropFunction } from "@builder.io/qwik";

import { UiNode } from "@ory/client";
import { isUiNodeInputAttributes } from "@ory/integrations/ui";
import { DefaultInput } from "~/components/default-input/default-input";
import { SubmitInput } from "~/components/submit-input/submit-input";

export type NodeUiProps = {
  node: UiNode;
  value: string;
  forceDisable?: boolean;
  onValueChanged$: PropFunction<(value: string) => void>;
  onSubmitRequested$: PropFunction<(additionalValues?: Record<string, string | number | boolean>) => void>;
};

export const NodeUi: Component<NodeUiProps> = component$(
  ({ node, value, forceDisable, onSubmitRequested$, onValueChanged$ }) => {
    const { attributes } = node;

    if (isUiNodeInputAttributes(attributes)) {
      switch (attributes.type) {
        case "hidden":
          return <input type="hidden" value={value} />;
        case "submit":
          return (
            <SubmitInput
              name={attributes.name}
              value={attributes.value}
              disabled={forceDisable || attributes.disabled}
              label={node.meta.label?.text}
              onClick$={() => onSubmitRequested$({[attributes.name]: attributes.value})}
            />
          );
        default:
          return (
            <DefaultInput
              type={attributes.type}
              name={attributes.name}
              value={value}
              disabled={forceDisable || attributes.disabled}
              label={node.meta.label?.text}
              onValueChanged$={(value) => onValueChanged$?.(value)}
            />
          );
      }
    }

    return <></>;
  }
);
