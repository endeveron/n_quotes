'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/core/components/ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormInput,
  FormItem,
  FormMessage,
  FormTextarea,
} from '@/core/components/ui/Form';
import FormLoading from '@/core/components/ui/FormLoading';
import { createQuote } from '@/core/features/quotes/actions';
import { quoteSchema, QuoteSchema } from '@/core/features/quotes/schemas';
import { useError } from '@/core/hooks/useError';
import { cn } from '@/core/utils';

export interface AddQuoteFormProps {
  onCreated: (success: boolean) => void;
}

const AddQuoteForm = ({ onCreated }: AddQuoteFormProps) => {
  const { toastError } = useError();
  const [isPending, setPending] = useState(false);

  const form = useForm<QuoteSchema>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      author: '',
      quote: '',
      translation: '',
      transcription: '',
    },
  });

  const onFormSubmit = async (quoteData: QuoteSchema) => {
    setPending(true);

    try {
      const res = await createQuote(quoteData);
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

  return (
    <Form {...form}>
      <div className="relative">
        <form
          onSubmit={form.handleSubmit(onFormSubmit)}
          className={cn('quote-form', isPending && 'inactive')}
        >
          <FormField
            control={form.control}
            name="quote"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FormTextarea
                    {...field}
                    className="min-h-18"
                    placeholder="Quote"
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

          <Button
            loading={isPending}
            className="quote-form_button"
            type="submit"
            variant="accent"
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
