'use client';
import { useEffect, useRef } from 'react';

/** The WebGL renderer is loaded separately, so reading and choosing never wait for 3D. */
export function PossibilityScene({ paused }: { paused: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const control = useRef<{
    pause: (value: boolean) => void;
    dispose: () => void;
  } | null>(null);
  const pausedRef = useRef(paused);
  useEffect(() => {
    pausedRef.current = paused;
    control.current?.pause(paused);
  }, [paused]);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let cancelled = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        void import('./render-possibility')
          .then(({ createPossibilityScene }) => {
            if (cancelled) return;
            control.current = createPossibilityScene(
              element,
              pausedRef.current,
            );
          })
          .catch(() => {
            element.dataset.fallback = 'true';
          });
      },
      { rootMargin: '160px' },
    );
    observer.observe(element);
    return () => {
      cancelled = true;
      observer.disconnect();
      control.current?.dispose();
      control.current = null;
    };
  }, []);
  return (
    <div ref={host} className="possibility-canvas" aria-hidden="true">
      <span className="sculpture-fallback">
        Five possibilities.
        <br />
        <em>All part of you.</em>
      </span>
    </div>
  );
}
