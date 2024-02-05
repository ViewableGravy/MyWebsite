import React from "react";
import { Paragraph } from "./paragraph";
import { Fieldset } from "./fieldSet";
import { z } from "zod";
import { OwnDevHandleMessage } from "./devmode";
import { validators } from "./validators";
import { Span } from "./span";
import { Anchor } from "./anchor";

export type TComponentProps<Name extends keyof typeof validators> = z.infer<typeof validators[Name]>['props'];
export type TComponentNames = keyof typeof validators;

const Components = {
  Paragraph: {
    component: Paragraph,
    validator: validators.Paragraph
  },
  Fieldset: {
    component: Fieldset,
    validator: validators.Fieldset
  },
  Span: {
    component: Span,
    validator: validators.Span
  },
  Anchor: {
    component: Anchor,
    validator: validators.Anchor
  }
} as const;

/**
 * Safe parse is used to parse the props of a component and return the component if the props are valid. If the props are invalid
 * then the OwnDevHandleMessage component is returned with the relevant error information (in dev mode)
 */
const safeParse = ({
  props,
  validator,
  Component
}: {
  props: unknown,
  validator: keyof typeof validators,
  Component: React.FC<any>
}) => {
  if (!(validator in validators)) {
    return (
      <OwnDevHandleMessage 
        type={validator} 
        validator={validator} 
        props={props} 
        parsed={{ error: 'Validator not found' }} 
      />
    )
  }

  const parsed = validators[validator].safeParse({ type: validator, props });

  if (parsed.success) {
    return <Component {...parsed.data.props} />
  }

  return (
    <OwnDevHandleMessage 
      type={validator} 
      validator={validator} 
      props={props} 
      parsed={parsed} 
    />
  )
}

type TComponentConstructor = React.FC<{ 
  type: TComponentNames | undefined, 
  props: TComponentProps<keyof typeof validators>,
  allowed?: TComponentNames[]
}>;

/**
 * Note: This component is expected to take in API responses and construct the relevant react component based on the response.
 * Although the response from the API "SHOULD" match the expected format, validation is done at this layer to ensure 
 * all the relevant prop information is present;
 */
export const ConstructComponent: TComponentConstructor = ({ type, props, allowed }) => {
  if (!type) return null;

  if (allowed && !allowed.includes(type)) {
    if (import.meta.env.DEV) {
      throw new Error(`Type ${type} is not allowed. Allowed types are: ${allowed.join(', ')}`)
    }

    return null; // fallback to null in production
  }

  return safeParse({
    props, 
    validator: type, 
    Component: Components[type]?.component
  });
}