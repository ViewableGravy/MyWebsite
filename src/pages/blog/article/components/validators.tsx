import { z } from 'zod';

/**
 * Validator are in the format { type: string, props: object } to match the format expected by the ConstructComponent component.
 * 
 * When children are nested however, there is a need for this nested structure to be validated prior to the props being passed to the component.
 * Therefore the getAcceptableRawChildren function is used to create a validator that can be used to validate the children of a component without
 * being in the format { type: string, props: object } and instead in a flat object format like they will be formatted.
 */
const getAcceptableRawChildren = <G extends string, T extends z.ZodObject<any> | z.ZodUnion<any>>(validator: z.ZodObject<{ type: z.ZodLiteral<G>, props: T }>) => {
  return z.intersection(
    z.object({
      type: validator.shape.type,
    }), 
    validator.shape.props
  )
}

/**
 * Generator function to create a validator and raw validator in the shape of { type: string, props: object } for a component.
 * 
 * The rawValidator should only be used to validate the children of a component, not the component itself.
 */
const generateTypePropsValidator = <Literal extends string, T extends z.ZodObject<any> | z.ZodUnion<[z.ZodTypeAny, ...z.ZodTypeAny[]]>>(type: Literal, props: T) => {
  const validator = z.object({
    type: z.literal(type),
    props
  });

  return {
    validator,
    rawValidator: getAcceptableRawChildren(validator)
  } as const;
}

const Fieldset = generateTypePropsValidator('Fieldset', z.object({
  legend: z.string(),
  content: z.string(),
  color: z.string().optional()
}));

const Span = generateTypePropsValidator('Span', z.object({
  text: z.string()
}));

const Anchor = generateTypePropsValidator(
  'Anchor', 
  z.union([
    z.object({
      text: z.string(),
      to: z.string(),
      params: z.record(z.string())
    }), 
    z.object({
      text: z.string(),
      href: z.string()
    })
  ])
);

const Paragraph = generateTypePropsValidator('Paragraph', z.object({
  text: z.union([
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
