import { Component, component$, Slot } from "@builder.io/qwik";
import assertNever from "assert-never/index";


export type TypographyProps = {
  variant: 'title' | 'headline' | 'text'
}


export const Typography: Component<TypographyProps> = component$(({variant}) => {

  switch (variant) {
    case "title": return (<h1 className="text-2xl font-semibold font-sans mt-4 mb-2"><Slot/></h1>)
    case "headline": return (<h2 className="text-l font-medium font-sans mt-4 mb-2"><Slot/></h2>)
    case "text": return (<span className="text-base"><Slot/></span>)
    default: assertNever(variant)
  }
});
