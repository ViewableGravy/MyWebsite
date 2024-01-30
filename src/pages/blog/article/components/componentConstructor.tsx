import React from "react";
import { Paragraph } from "./paragraph";
import { Fieldset } from "./fieldSet";
import { z } from "zod";
import { OwnDevHandleMessage } from "./devmode";

/**
 * Base object with validators for the props of components. Component props are based on the validator types and are accessible
 * via the TComponentProps type. This is used to ensure that the component props are always in sync with the validator.
 */
const validators = {
  Paragraph: z.object({
    type: z.literal('Paragraph'),
    props: z.object({
      text: z.string(),
      isFirst: z.boolean().optional()
    })
  }),
  Fieldset: z.object({
    type: z.literal('Fieldset'),
    props: z.object({
      legend: z.string(),
      content: z.string(),
      color: z.string().optional()
    })
  })
}

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
  }
}

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
  if (!(validator in validators)) return (
    <OwnDevHandleMessage 
      type={validator} 
      validator={validator} 
      props={props} 
      parsed={{ error: 'Validator not found' }} 
    />
  )

  const parsed = validators[validator].safeParse({ type: validator, props });

  if (parsed.success)
    return <Component {...parsed.data.props} />

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
  props: TComponentProps<keyof typeof validators> 
}>;

/**
 * Note: This component is expected to take in API responses and construct the relevant react component based on the response.
 * Although the response from the API "SHOULD" match the expected format, validation is done at this layer to ensure 
 * all the relevant prop information is present;
 */
export const ConstructComponent: TComponentConstructor = ({ type, props }) => {
  if (!type) return null;

  return safeParse({
    props, 
    validator: type, 
    Component: Components[type]?.component
  });
}