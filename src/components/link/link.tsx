import { Component, component$, Slot } from "@builder.io/qwik";
import {Link as QwikCityLink} from "@builder.io/qwik-city"
import classNames from "classnames";

export type LinkProps = {
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "accent"
    | "neutral"
    | "hover";
  href?: string;
};

export const Link: Component<LinkProps> = component$(({ variant, href }) => {
  return (
    <QwikCityLink
      className={classNames("link", {
        [`link-${variant}`]: variant != null && variant !== "default",
      })}
      href={href}
    >
      <Slot />
    </QwikCityLink>
  );
});
