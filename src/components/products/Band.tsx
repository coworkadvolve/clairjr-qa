import Link from 'next/link';
import { Fragment } from 'react';

export interface Crumb {
  label: string;
  href?: string;
}

/** Page title band with breadcrumb. Without a title it renders the slim crumb-only bar. */
export function Band({ title, text, crumbs }: { title?: string; text?: string; crumbs: Crumb[] }) {
  return (
    <section className={`band${title ? '' : ' slim'}`}>
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          {crumbs.map((c, i) => (
            <Fragment key={i}>
              {i > 0 && <span>/</span>}
              {c.href ? <Link href={c.href}>{c.label}</Link> : c.label}
            </Fragment>
          ))}
        </nav>
        {title && <h1>{title}</h1>}
        {text && <p>{text}</p>}
      </div>
    </section>
  );
}
