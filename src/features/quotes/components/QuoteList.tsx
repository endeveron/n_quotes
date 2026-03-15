'use client';

import { ScrollArea } from '@/components/ui/ScrollArea';
import QuoteItem from '@/features/quotes/components/QuoteItem';
import { ParsedQuote } from '@/features/quotes/types';
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice';
import { DragDropProvider, DragEndEvent } from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';
import { cn } from '@/utils';

import { useState, useEffect } from 'react';
import { reorderQuotes } from '@/features/quotes/actions';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';

function arrayMove<T>(array: T[], from: number, to: number): T[] {
  const newArray = array.slice();
  newArray.splice(to, 0, newArray.splice(from, 1)[0]);
  return newArray;
}

export interface QuoteListProps {
  fetching: boolean;
  quotes: ParsedQuote[];
  onUpdate: () => void;
}

const QuoteList = ({ fetching, quotes, onUpdate }: QuoteListProps) => {
  const isTouchDevice = useIsTouchDevice();
  const [items, setItems] = useState<ParsedQuote[]>(quotes);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setItems(quotes);
  }, [quotes]);

  const isDirty =
    JSON.stringify(items.map((i) => i.id)) !==
    JSON.stringify(quotes.map((i) => i.id));

  const handleDragEnd = (event: Parameters<DragEndEvent>[0]) => {
    if (event.canceled) return;

    const { source } = event.operation;

    if (isSortable(source)) {
      const { initialIndex, index } = source;

      if (initialIndex !== index) {
        setItems((items) => {
          const newItems = [...items];
          const [removed] = newItems.splice(initialIndex, 1);
          newItems.splice(index, 0, removed);
          return newItems;
        });
      }
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updates = items.map((item, index) => ({
        id: item.id,
        index: index, // New index based on position
      }));

      const res = await reorderQuotes(updates);
      if (res?.success) {
        onUpdate();
      } else {
        toast('Failed to save order');
      }
    } catch (err: unknown) {
      console.error(err);
      toast('An error occurred while saving');
    } finally {
      setSaving(false);
    }
  };

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <div className="flex-1 min-h-0 flex flex-col gap-4">
        {isDirty && (
          <div className="flex justify-start px-2">
            <Button disabled={saving} onClick={handleSave}>
              {saving ? 'Saving...' : 'Save Order'}
            </Button>
          </div>
        )}
        <div
          className={cn(
            'grid grid-cols-1 sm:grid-cols-2 items-start w-full gap-x-4 gap-y-3 trans-o',
            fetching ? 'opacity-20 pointer-events-none' : 'opacity-100',
          )}
        >
          {items.map((item, index) => (
            <QuoteItem
              {...item}
              index={index}
              key={item.id}
              isTouchDevice={isTouchDevice}
              onDelete={onUpdate}
            />
          ))}
        </div>
      </div>
    </DragDropProvider>
  );
};

export default QuoteList;
