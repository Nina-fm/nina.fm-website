import type { AcceptableValue } from "reka-ui";

export const key = Symbol("toggler") as InjectionKey<string>;

export interface TogglerContext {
  value: Ref<AcceptableValue>;
  setValue: (value: AcceptableValue) => void;
}
