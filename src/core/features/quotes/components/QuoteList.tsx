'use client';

import { ScrollArea } from '@/core/components/ui/ScrollArea';
import QuoteItem from '@/core/features/quotes/components/QuoteItem';
import { ParsedQuote } from '@/core/features/quotes/types';
import { useIsTouchDevice } from '@/core/hooks/useIsTouchDevice';
import { cn } from '@/core/utils';

export interface QuoteListProps {
  fetching: boolean;
  quotes: ParsedQuote[];
  onQuoteDelete: () => void;
}

const QuoteList = ({ fetching, quotes, onQuoteDelete }: QuoteListProps) => {
  const isTouchDevice = useIsTouchDevice();

  return (
    <ScrollArea>
      <div
        className={cn(
          'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start flex-1 w-full gap-x-4 gap-y-3 trans-o',
          fetching ? 'opacity-20 pointer-events-none' : 'opacity-100'
        )}
      >
        {quotes.map((item) => (
          <QuoteItem
            {...item}
            key={item.id}
            isTouchDevice={isTouchDevice}
            onDelete={onQuoteDelete}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default QuoteList;
