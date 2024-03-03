import { z } from 'zod';

/**
 * Generator function to create a validator and raw validator in the shape of { type: string, props: object } for a component.
 * 
 * The rawValidator should only be used to validate the children of a component, not the component itself.
 */
const generateTypePropsValidator = <Literal extends string, T extends z.ZodTypeAny>(type: Literal, props: T) => {
  const validator = z.object({
    type: z.literal(type),
    props
  }).required();

  const rawValidator = z.intersection(
    z.object({
      type: z.literal(type)
    }),
    props
  )

  return {
    validator,
    rawValidator
  } as const;
}

const Fieldset = generateTypePropsValidator('Fieldset', z.object({
  legend: z.string(),
  content: z.string(),
  color: z.string().optional()
}));

const Span = generateTypePropsValidator('Span', z.object({
  children: z.string()
}));

const Anchor = generateTypePropsValidator(
  'Anchor', 
  z.union([
    z.object({
      children: z.string(),
      to: z.string(),
      params: z.record(z.string())
    }), 
    z.object({
      children: z.string(),
      href: z.string()
    })
  ])
);

const Paragraph = generateTypePropsValidator('Paragraph', z.object({
  children: z.union([
      z.string(),
      z.array(z.union([
        Anchor.rawValidator,
        Span.rawValidator
      ]))
  ]),
  isFirst: z.boolean().optional()
}));

/**
 * Base object with validators for the props of components. Component props are based on the validator types and are accessible
 * via the TComponentProps type. This is used to ensure that the component props are always in sync with the validator.
 */
export const validators = {
  Fieldset: Fieldset.validator,
  Span: Span.validator,
  Anchor: Anchor.validator,
  Paragraph: Paragraph.validator
} as const;
