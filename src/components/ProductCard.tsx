import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { routes } from '@/lib/routes';

interface ProductCardProps {
  name: string;
  shortDescription: string;
  imageUrl: string;
  category: string;
  slug: string;
  onRequestQuote?: () => void;
}

export function ProductCard({
  name,
  shortDescription,
  imageUrl,
  category,
  slug,
  onRequestQuote,
}: ProductCardProps) {
  return (
    <div className="group bg-white border border-neutral-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
      <div className="aspect-video md:aspect-square bg-white overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-contain p-4 md:p-8 group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5 md:p-6 flex flex-col flex-grow">
        <div className="inline-block px-3 py-1 bg-brand-orange/10 border border-brand-orange/20 rounded-full mb-3">
          <span className="text-xs font-semibold text-brand-orange uppercase tracking-wider">
            {category}
          </span>
        </div>
        <h3 className="text-xl font-semibold mb-3 text-neutral-900">
          {name}
        </h3>
        <p className="text-neutral-600 mb-4 line-clamp-2">
          {shortDescription}
        </p>
        <div className="flex items-center gap-3 mt-auto pt-2">
          <Link
            href={routes.product(slug)}
            className="inline-flex items-center gap-2 text-brand-orange font-medium hover:gap-3 transition-all duration-200"
          >
            View Details
            <ArrowRight size={16} />
          </Link>
          {onRequestQuote && (
            <button
              onClick={onRequestQuote}
              className="ml-auto px-4 py-2 bg-brand-orange text-white text-sm font-medium rounded hover:bg-brand-orange-dark transition-colors"
            >
              Get Quote
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
