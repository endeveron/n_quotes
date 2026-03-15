'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { getQuotes } from '@/features/quotes/actions';
import { ParsedQuote } from '@/features/quotes/types';
import { useError } from '@/hooks/useError';

interface QuotesContextType {
  quote: ParsedQuote | null;
  quotes: ParsedQuote[];
  fetching: boolean;
  nextQuote: () => void;
  prevQuote: () => void;
  updateQuotes: () => void;
}

const QuotesContext = createContext<QuotesContextType | undefined>(undefined);

export function QuotesProvider({ children }: { children: ReactNode }) {
  // const { getItem, setItem } = useLocalStorage();
  const { toastError } = useError();

  const [quotes, setQuotes] = useState<ParsedQuote[]>([]);
  const [quote, setQuote] = useState<ParsedQuote | null>(null);
  const [fetching, setFetching] = useState(false);
  const [curIndex, setCurIndex] = useState(0);

  const totalQuotesNum = useRef(0);

  const nextQuote = useCallback(() => {
    const newIndex = curIndex < totalQuotesNum.current - 1 ? curIndex + 1 : 0;
    setCurIndex(newIndex);
    setQuote(quotes[newIndex]);
  }, [curIndex, quotes]);

  const prevQuote = useCallback(() => {
    const newIndex = curIndex > 0 ? curIndex - 1 : totalQuotesNum.current - 1;
    setCurIndex(newIndex);
    setQuote(quotes[newIndex]);
  }, [curIndex, quotes]);

  const updateQuotes = useCallback(async () => {
    setFetching(true);
    try {
      const res = await getQuotes();
      if (!res?.success) {
        toastError(res);
        return;
      }
      if (!res.data) {
        toastError('Unable to retrieve quotes');
        return;
      }

      setQuotes(res.data);

      if (
        !totalQuotesNum.current ||
        totalQuotesNum.current !== res.data.length
      ) {
        totalQuotesNum.current = res.data.length;
      }

      setQuote(res.data[0]);
    } catch (err: unknown) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  }, [toastError]);

  useEffect(() => {
    updateQuotes();
  }, [updateQuotes]);

  return (
    <QuotesContext.Provider
      value={{ fetching, quote, quotes, nextQuote, prevQuote, updateQuotes }}
    >
      {children}
    </QuotesContext.Provider>
  );
}

export function useQuotes() {
  const context = useContext(QuotesContext);
  if (!context) throw new Error('useQuotes must be used within QuotesProvider');
  return context;
}
