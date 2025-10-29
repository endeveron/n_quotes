'use client';

import { useRouter } from 'next/navigation';

import { NavBackIcon } from '@/core/components/icons/NavBackIcon';
import { Separator } from '@/core/components/ui/Separator';
import AddQuoteForm from '@/core/features/quotes/components/AddQuoteForm';
import QuoteList from '@/core/features/quotes/components/QuoteList';
import { useQuotes } from '@/core/features/quotes/context/quotes';

const EditQuotesClient = () => {
  const router = useRouter();

  const { fetching, quotes, updateQuotes } = useQuotes();

  const handleAddQuoteResult = (success: boolean) => {
    if (success) {
      updateQuotes();
    }
  };

  return (
    <div className="fade size-full mx-auto pt-14 px-4 pb-4 w-full min-w-xs max-w-[1724px] flex flex-col">
      {/* Header */}
      <div className="fixed top-4 left-3">
        <NavBackIcon
          className="icon--action"
          onClick={() => {
            router.back();
          }}
        />
      </div>

      {/* Add a new quote */}
      <AddQuoteForm onCreated={handleAddQuoteResult} />

      <Separator className="my-8" />

      {/* Quotes */}
      <QuoteList
        fetching={fetching}
        quotes={quotes}
        onQuoteDelete={updateQuotes}
      />
    </div>
  );
};

export default EditQuotesClient;
