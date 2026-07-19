import { useLayoutEffect } from 'react';

export function ScrollToOnMount({ y = 0 }: { y?: number }) {
  useLayoutEffect(() => {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(y, { immediate: true });
    } else {
      window.scrollTo(0, y);
    }
  }, [y]);
  return null;
}
