import { Component, component$, PropFunction } from "@builder.io/qwik";

export type DefaultInputProps = {
  type: string;
  label?: string;
  disabled?: boolean;
  name: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  onValueChanged$?: PropFunction<(value: string) => void>
};

export const DefaultInput: Component<DefaultInputProps> = component$(
  ({ type, label, required, placeholder, name, value, disabled, onValueChanged$ }) => {
    return (
      <>
        <label className="label">
          <span className="label-text">{label}</span>
          {required || (<span className="label-text-alt">required</span>)}
        </label>
        <input
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          className="input input-bordered w-full max-w-xs"
          name={name}
          value={value}
          onChange$={(e) => onValueChanged$?.((e?.target as HTMLInputElement)?.value ?? '')}
        />
      </>
    );
  }
);
