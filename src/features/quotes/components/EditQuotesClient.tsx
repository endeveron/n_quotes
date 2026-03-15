'use client';

import { useRouter } from 'next/navigation';

import { NavBackIcon } from '@/components/icons/NavBackIcon';
import { Separator } from '@/components/ui/Separator';
import AddQuoteForm from '@/features/quotes/components/AddQuoteForm';
import QuoteList from '@/features/quotes/components/QuoteList';
import { useQuotes } from '@/features/quotes/context/quotes';
import { ScrollArea } from '@/components/ui/ScrollArea';

const EditQuotesClient = () => {
  const router = useRouter();

  const { fetching, quotes, updateQuotes } = useQuotes();

  const handleAddQuoteResult = (success: boolean) => {
    if (success) {
      updateQuotes();
    }
  };

  return (
    <div className="fade size-full mx-auto pt-14 px-4 pb-4 w-full min-w-xs max-w-430 flex flex-col">
      {/* Header */}
      <div className="fixed top-4 left-3">
        <NavBackIcon
          className="icon--action"
          onClick={() => {
            router.back();
          }}
        />
      </div>

      <div className="flex-1 min-h-0 flex flex-col gap-4 lg:flex-row">
        {/* Add a new quote */}
        <AddQuoteForm
          quotesLength={quotes.length}
          onCreated={handleAddQuoteResult}
        />

        <Separator className="my-4 lg:hidden" />

        <ScrollArea className="flex-1">
          {/* Quotes */}
          <QuoteList
            fetching={fetching}
            quotes={quotes}
            onUpdate={updateQuotes}
          />
        </ScrollArea>
      </div>
    </div>
  );
};

export default EditQuotesClient;
