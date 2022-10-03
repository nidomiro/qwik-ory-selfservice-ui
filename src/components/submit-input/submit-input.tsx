import { Component, component$, PropFunction } from "@builder.io/qwik";

export type SubmitInputProps = {
  label?: string;
  disabled?: boolean;
  name: string;
  value: string;
  onClick$?: PropFunction<() => void>
};

export const SubmitInput: Component<SubmitInputProps> = component$(
  ({ label, name, value, disabled, onClick$ }) => {
    return (
      <>
        <button
          className="btn btn-primary my-4"
          type="submit"
          disabled={disabled}
          name={name}
          value={value}
          onClick$={() => onClick$?.()}
        >
          {label}
        </button>
      </>
    );
  }
);
