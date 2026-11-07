'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/** Static-export friendly redirect for retired product addresses. */
export function LegacyRedirect({ to }: { to: string }) {
  const router = useRouter();
  useEffect(() => {
    router.replace(to);
  }, [router, to]);
  return <meta httpEquiv="refresh" content={`0; url=${to}`} />;
}
