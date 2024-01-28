import React from "react";
import { Paragraph } from "./paragraph";
import { Fieldset } from "./fieldSet";
import { z } from "zod";

type PropsOf<T> = T extends React.FC<infer P> ? P : never;

const validators = {
  Paragraph: z.object({
    type: z.literal('Paragraph'),
    props: z.object({
      text: z.string()
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

type TPossibleComponentProps = {
  Paragraph: {
    type: 'Paragraph',
    props: PropsOf<typeof Paragraph>
  },
  Fieldset: {
    type: 'Fieldset',
    props: PropsOf<typeof Fieldset>
  },
}

type ValidateValidator<T extends keyof TPossibleComponentProps> = z.infer<typeof validators[T]> extends TPossibleComponentProps[T] ? true : false
type TParagraphMatches = ValidateValidator<keyof TPossibleComponentProps>

/**
 * This line is going to throw an error if the validation schema becomes out of sync with the component. If this does return
 * false and you are unsure of which component is triggering the error. Start by commenting out each key in 
 * TPossibleComponentProps one by one until the error goes away, then from there you can figure out which component is
 * causing the error and update the validator accordingly.
 */
if (import.meta.env.DEV) {
  const isValidValidator: TParagraphMatches = true;
}

const safeParse = (
  props: unknown,
  validator: keyof typeof validators,
  Component: React.FC<any>
) => {
  const parsed = validators[validator].safeParse({ type: validator, props });

  if (parsed.success)
    return <Component {...parsed.data.props} />
  else
    return null;
}

type TComponentConstructor = React.FC<TPossibleComponentProps[keyof TPossibleComponentProps]>;
/**
 * Note: This component is expected to take in API responses and construct the relevant react component based on the response.
 * Although the response from the API "SHOULD" match the expected format, validation is done at this layer to ensure 
 * all the relevant prop information is present;
 */
export const ConstructComponent: TComponentConstructor = ({ type, props }) => {
  switch (type) {
    case 'Paragraph':
      return safeParse(props, type, Paragraph);
    case 'Fieldset':
      return safeParse(props, type, Fieldset);
    default:
      return null;
  }
}