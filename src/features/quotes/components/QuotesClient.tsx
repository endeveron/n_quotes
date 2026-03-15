'use client';

import { useEffect } from 'react';

import { Button } from '@/components/ui/Button';
import Loading from '@/components/ui/Loading';
import QuoteCard from '@/features/quotes/components/QuoteCard';
import { useQuotes } from '@/features/quotes/context/quotes';
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice';
import { useSwipeHandlers } from '@/hooks/useSwipeHandlers';

const QuotesClient = () => {
  const { fetching, quote, quotes, nextQuote, prevQuote } = useQuotes();
  const isTouchDevice = useIsTouchDevice();
  const swipeHandlers = useSwipeHandlers({
    onSwipeLeft: () => {
      nextQuote();
    },
    onSwipeRight: () => {
      prevQuote();
    },
    onSwipeUp: () => {
      nextQuote();
    },
  });

  useEffect(() => {
    if (isTouchDevice) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        prevQuote();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        nextQuote();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTouchDevice, nextQuote, prevQuote]);

  return (
    <div className="flex flex-1 flex-col w-full">
      {fetching && (
        <main className="fixed z-20 inset-0 flex flex-1 flex-center bg-background/60">
          <Loading />
        </main>
      )}

      {!fetching && quote && (
        <main {...swipeHandlers} className="flex-1 flex-center">
          <QuoteCard {...quote} key={quote.id} />
        </main>
      )}

      {!fetching && !isTouchDevice && quotes.length > 1 && (
        <footer className="h-40 justify-center px-4 flex gap-10">
          <Button
            onClick={prevQuote}
            variant="outline"
            className="uppercase font-medium"
          >
            prev
          </Button>
          <Button
            onClick={nextQuote}
            variant="outline"
            className="uppercase font-medium"
          >
            next
          </Button>
        </footer>
      )}
    </div>
  );
};

export default QuotesClient;
