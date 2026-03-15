'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormInput,
  FormItem,
  FormMessage,
  FormTextarea,
} from '@/components/ui/Form';
import FormLoading from '@/components/ui/FormLoading';
import { createQuote } from '@/features/quotes/actions';
import { quoteSchema, QuoteSchema } from '@/features/quotes/schemas';
import { useError } from '@/hooks/useError';
import { cn } from '@/utils';

export interface AddQuoteFormProps {
  quotesLength: number;
  onCreated: (success: boolean) => void;
}

const AddQuoteForm = ({ quotesLength, onCreated }: AddQuoteFormProps) => {
  const { toastError } = useError();
  const [isPending, setPending] = useState(false);

  const form = useForm({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      author: '',
      quote: '',
      index: 0,
      translation: '',
      transcription: '',
    },
  });

  const isDirty = (
    Object.entries(form.formState.dirtyFields) as [keyof QuoteSchema, boolean][]
  ).some(([key, dirty]) => key !== 'index' && dirty);

  const onFormSubmit = async (quote: QuoteSchema) => {
    setPending(true);

    const data = { ...quote, index: quote.index - 1 };
    const isIndexUpdated = data.index !== quotesLength;

    try {
      const res = await createQuote({
        data,
        isIndexUpdated,
      });
      if (!res?.success) {
        toastError(res);
        setPending(false);
        onCreated(false);
        return;
      }

      onCreated(true);
      form.reset();
    } catch (err: unknown) {
      toastError(err);
      onCreated(false);
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    form.setValue('index', quotesLength + 1);
  }, [quotesLength]);

  return (
    <Form {...form}>
      <div className="relative">
        <form
          onSubmit={form.handleSubmit(onFormSubmit)}
          className={cn('quote-form', isPending && 'inactive')}
        >
          <div className="grid gap-4 w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 lg:w-80">
            <FormField
              control={form.control}
              name="quote"
              render={({ field }) => (
                <FormItem className="sm:col-span-2 lg:col-span-1">
                  <FormControl>
                    <FormTextarea
                      {...field}
                      className="min-h-16"
                      placeholder="Quote"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="index"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormInput
                      type="number"
                      min={0}
                      max={quotesLength + 1}
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ''
                            ? undefined
                            : Number(e.target.value),
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormInput {...field} placeholder="Author ( optional )" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="translation"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormTextarea
                      {...field}
                      placeholder="Translation ( optional )"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="transcription"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormTextarea
                      {...field}
                      placeholder="Transcription ( optional )"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            loading={isPending}
            disabled={isPending || !form.formState.isValid || !isDirty}
            className="quote-form_button"
            type="submit"
          >
            Add a Quote
          </Button>
        </form>
        <FormLoading loadigIconClassName="-mt-14" isPending={isPending} />
      </div>
    </Form>
  );
};

export default AddQuoteForm;
