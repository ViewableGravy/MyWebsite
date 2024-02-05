import { z } from 'zod';

/**
 * Validator are in the format { type: string, props: object } to match the format expected by the ConstructComponent component.
 * 
 * When children are nested however, there is a need for this nested structure to be validated prior to the props being passed to the component.
 * Therefore the getAcceptableRawChildren function is used to create a validator that can be used to validate the children of a component without
 * being in the format { type: string, props: object } and instead in a flat object format like they will be formatted.
 */
const getAcceptableRawChildren = <G extends string, T extends z.ZodObject<any>>(validator: z.ZodObject<{ type: z.ZodLiteral<G>, props: T }>) => {
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
const generateTypePropsValidator = <Literal extends string, T extends z.ZodObject<any>>(type: Literal, props: T) => {
  const validator = z.object({
    type: z.literal(type),
    props
  });

  return {
    validator,
    rawValidator: getAcceptableRawChildren(validator)
  } as const;
}

const { validator: FieldsetValidator } = generateTypePropsValidator('Fieldset', z.object({
  legend: z.string(),
  content: z.string(),
  color: z.string().optional()
}));

const { validator: SpanValidator, rawValidator: SpanRawValidator } = generateTypePropsValidator('Span', z.object({
  text: z.string()
}));

const { validator: AnchorValidator, rawValidator: AnchorRawValidator } = generateTypePropsValidator('Anchor', z.object({
  text: z.string(),
  to: z.string()
}));

const ParagraphValidator = z.object({
  type: z.literal('Paragraph'),
  props: z.object({
      text: z.union([
          z.string(),
          z.array(z.union([
            AnchorRawValidator,
            SpanRawValidator
          ]))
      ]),
      isFirst: z.boolean().optional()
  })
})

/**
 * Base object with validators for the props of components. Component props are based on the validator types and are accessible
 * via the TComponentProps type. This is used to ensure that the component props are always in sync with the validator.
 */
export const validators = {
  Fieldset: FieldsetValidator,
  Span: SpanValidator,
  Anchor: AnchorValidator,
  Paragraph: ParagraphValidator
} as const;
