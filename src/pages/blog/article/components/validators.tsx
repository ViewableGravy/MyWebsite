import { z } from 'zod';

const FieldsetValidator = z.object({
  type: z.literal('Fieldset'),
  props: z.object({
      legend: z.string(),
      content: z.string(),
      color: z.string().optional()
  })
})

const SpanValidator = z.object({
  type: z.literal('Span'),
  props: z.object({
      text: z.string()
  })
})

const AnchorValidator = z.object({
  type: z.literal('Anchor'),
  props: z.object({
      text: z.string(),
      to: z.string()
  })
})

const ParagraphValidator = z.object({
  type: z.literal('Paragraph'),
  props: z.object({
      text: z.union([
          z.string(),
          z.array(z.union([
              SpanValidator,
              AnchorValidator
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
