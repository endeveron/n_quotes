import { useSwipeable, SwipeableHandlers } from 'react-swipeable';

export type SwipeDirection = 'left' | 'right' | 'up' | 'down';

interface SwipeCallbacks {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  // onSwipeDown?: () => void;
}

export function useSwipeHandlers(callbacks: SwipeCallbacks): SwipeableHandlers {
  const handlers = useSwipeable({
    onSwipedLeft: () => callbacks.onSwipeLeft?.(),
    onSwipedRight: () => callbacks.onSwipeRight?.(),
    onSwipedUp: () => callbacks.onSwipeUp?.(),
    // onSwipedDown: () => callbacks.onSwipeDown?.(),

    // Configuration options
    trackMouse: false, // Don't track mouse swipes, only touch
    trackTouch: true,
    delta: 50, // Minimum distance (px) before swipe is triggered
    preventScrollOnSwipe: false, // Allow normal scrolling
    touchEventOptions: { passive: true }, // Better performance
  });

  return handlers;
}
