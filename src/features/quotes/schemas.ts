import { z } from 'zod';

export const quoteSchema = z.object({
  author: z.string().max(80, {
    message: 'Maximum length 80 characters',
  }),
  index: z.number(),
  quote: z
    .string()
    .min(5, {
      message: 'Quote must contain at least 5 characters',
    })
    .max(120, {
      message: 'Maximum length 120 characters',
    }),
  transcription: z.string(),
  translation: z.string(),
});

export type QuoteSchema = z.infer<typeof quoteSchema>;
