'use client';

import { DeleteIcon } from '@/components/icons/DeleteIcon';
import MenuPrompt from '@/components/ui/MenuPrompt';
import { deleteQuote } from '@/features/quotes/actions';
import { ParsedQuote } from '@/features/quotes/types';
import { useSortable } from '@dnd-kit/react/sortable';
import { useState } from 'react';
import { cn } from '@/utils';

export interface QuoteItemProps extends ParsedQuote {
  isTouchDevice: boolean;
  onDelete: () => void;
}

const QuoteItem = ({
  id,
  index,
  isTouchDevice,
  quote,
  onDelete,
}: QuoteItemProps) => {
  const { ref } = useSortable({ id, index });
  const [isPrompt, setIsPrompt] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await deleteQuote({ id, index });
      if (res?.success) {
        onDelete();
      }
    } catch (err: unknown) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div ref={ref} className={cn('quote-item trans-c')}>
      <div className="truncate">{quote}</div>
      <div
        data-touch-device={isTouchDevice}
        className="quote-item_toolbar flex-center trans-a"
      >
        {isPrompt ? (
          <MenuPrompt
            loading={deleting}
            onAccept={handleDelete}
            onDecline={() => setIsPrompt(false)}
          />
        ) : (
          <div onClick={() => setIsPrompt(true)}>
            <DeleteIcon className="w-8 icon--action scale-75" />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteItem;
