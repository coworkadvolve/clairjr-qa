'use client';

import { useState } from 'react';

import { RequestQuotePopup } from '@/components/RequestQuotePopup';

interface QuoteButtonProps {
  productName?: string;
  className?: string;
  label?: string;
}

/** "Get a Quote" that opens the site's existing quote form with the product prefilled. */
export function QuoteButton({ productName, className = 'gq', label = 'Get Quote' }: QuoteButtonProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {label}
      </button>
      <RequestQuotePopup isOpen={open} onClose={() => setOpen(false)} productName={productName} />
    </>
  );
}
