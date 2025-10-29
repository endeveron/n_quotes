import { useEffect, useState } from 'react';

export function useIsTouchDevice(): boolean {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check for touch support
    const hasTouchSupport =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      // @ts-expect-error - for older browsers
      navigator.msMaxTouchPoints > 0;

    setIsTouchDevice(hasTouchSupport);
  }, []);

  return isTouchDevice;
}
