'use server';

import QuoteModel from '@/features/quotes/models/quote';
import { ParsedQuote, Quote, QuoteDB } from '@/features/quotes/types';
import { mongoDB } from '@/lib/mongo';
import { ServerActionResult } from '@/types/common';
import { handleActionError } from '@/utils/error';
import { Types } from 'mongoose';

export const createQuote = async ({
  data,
  isIndexUpdated,
}: {
  data: Quote;
  isIndexUpdated: boolean;
}): Promise<ServerActionResult> => {
  if (!data?.quote) {
    return handleActionError('createQuote: Invalid data provided');
  }

  try {
    await mongoDB.connect();

    if (isIndexUpdated) {
      await QuoteModel.updateMany(
        { index: { $gte: data.index } },
        { $inc: { index: 1 } },
      );
    }

    await QuoteModel.create(data);

    return {
      success: true,
    };
  } catch (err: unknown) {
    return handleActionError('Unable to create a new quote item in db', err);
  }
};

export const getQuotes = async (): Promise<
  ServerActionResult<ParsedQuote[]>
> => {
  try {
    await mongoDB.connect();

    const quotes = await QuoteModel.find<QuoteDB>({}).sort({ index: 1 }); // ascending (0 → 9)

    const parsedQuotes: ParsedQuote[] = quotes.map((q) => ({
      id: q._id.toString(),
      index: q.index,
      author: q.author,
      quote: q.quote,
      transcription: q.transcription,
      translation: q.translation,
    }));

    return {
      success: true,
      data: parsedQuotes,
    };
  } catch (err: unknown) {
    return handleActionError('Unable to retrieve quote items from the db', err);
  }
};

export const deleteQuote = async ({
  id,
  index,
}: {
  id: string;
  index: number;
}): Promise<ServerActionResult> => {
  if (!id) {
    return handleActionError('deleteQuote: Invalid quote id');
  }

  try {
    await mongoDB.connect();

    await QuoteModel.findByIdAndDelete(id);

    await QuoteModel.updateMany(
      { index: { $gt: index } },
      { $inc: { index: -1 } },
    );

    return {
      success: true,
    };
  } catch (err: unknown) {
    return handleActionError('Unable to delete quote item in db', err);
  }
};

export const reorderQuotes = async (
  updates: { id: string; index: number }[],
): Promise<ServerActionResult> => {
  try {
    await mongoDB.connect();

    for (const update of updates) {
      await QuoteModel.findByIdAndUpdate(update.id, {
        $set: { index: update.index },
      });
    }

    return {
      success: true,
    };
  } catch (err: unknown) {
    console.log('reorderQuotes error:', err);
    return handleActionError('Unable to reorder quote items in db', err);
  }
};
