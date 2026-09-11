'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
export function PwaSupport() {
  const [offline, setOffline] = useState(false);
  const [waiting, setWaiting] = useState<ServiceWorker | null>(null);
  useEffect(() => {
    const update = () => setOffline(!navigator.onLine);
    update();
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    let disposed = false;
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      void navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((reg) => {
          if (disposed) return;
          if (reg.waiting) setWaiting(reg.waiting);
          reg.addEventListener('updatefound', () => {
            const worker = reg.installing;
            worker?.addEventListener('statechange', () => {
              if (
                !disposed &&
                worker.state === 'installed' &&
                navigator.serviceWorker.controller
              )
                setWaiting(worker);
            });
          });
        })
        .catch(() => {
          /* Browser use still works when installation is unavailable. */
        });
    }
    return () => {
      disposed = true;
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, []);
  return (
    <>
      {offline && (
        <div className="connection-banner" role="status">
          You’re offline. Keep choosing on this open page; new pages and
          interest requests need a connection.
        </div>
      )}
      {waiting && (
        <div className="connection-banner" role="status">
          An update is ready. Save your work before updating.
          <Button
            variant="outline"
            className="secondary-action"
            onClick={() => {
              navigator.serviceWorker.addEventListener(
                'controllerchange',
                () => location.reload(),
                { once: true },
              );
              waiting.postMessage({ type: 'ACTIVATE_UPDATE' });
            }}
          >
            Update now
          </Button>
        </div>
      )}
    </>
  );
}
