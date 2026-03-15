import { Schema, model, models } from 'mongoose';

import { Quote } from '@/features/quotes/types';

const quoteSchema = new Schema<Quote>(
  {
    index: { type: Number, default: 0 },
    author: { type: String },
    quote: { type: String, required: true },
    transcription: { type: String },
    translation: { type: String },
  },
  {
    versionKey: false,
  },
);

const QuoteModel = models.Quote || model('Quote', quoteSchema);

export default QuoteModel;
