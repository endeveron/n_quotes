'use client';

import { useTailwindBreakpoint } from '@/hooks/useTailwindBreakpoint';
import Image from 'next/image';

export const Visual = () => {
  const { isMd } = useTailwindBreakpoint();

  if (!isMd) return null;

  return (
    <div className="flex-1 flex-center bg-area p-8">
      <Image
        src="/images/icons/icon.svg"
        className="fade"
        width={512}
        height={512}
        loading="eager"
        alt="Icon"
      />
    </div>
  );
};
