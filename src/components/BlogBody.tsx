import type { ReactNode } from 'react';

import type { BlogBodyBlock, BlogSpan } from '@/lib/blog';
import { urlForImage } from '@/sanity/image';

function renderSpan(span: BlogSpan, block: BlogBodyBlock): ReactNode {
  let content: ReactNode = span.text || '';
  for (const mark of span.marks || []) {
    if (mark === 'strong') content = <strong>{content}</strong>;
    else if (mark === 'em') content = <em>{content}</em>;
    else if (mark === 'code') content = <code>{content}</code>;
    else {
      const definition = block.markDefs?.find((item) => item._key === mark);
      if (definition?.href) content = <a href={definition.href} target={definition.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{content}</a>;
    }
  }
  return <span key={span._key || span.text}>{content}</span>;
}

export function BlogBody({ body }: { body: BlogBodyBlock[] }) {
  return (
    <div className="blog-prose">
      {body.map((block, index) => {
        const key = block._key || String(index);
        if (block._type === 'image' && block.asset) {
          let src = '';
          try { src = urlForImage(block as never).width(1200).quality(88).url(); } catch { src = ''; }
          return src ? <figure key={key}><img src={src} alt={block.alt || ''} />{block.caption && <figcaption>{block.caption}</figcaption>}</figure> : null;
        }
        const content = block.children?.map((span) => renderSpan(span, block));
        if (block.style === 'h2') return <h2 key={key}>{content}</h2>;
        if (block.style === 'h3') return <h3 key={key}>{content}</h3>;
        if (block.style === 'blockquote') return <blockquote key={key}>{content}</blockquote>;
        return <p key={key}>{content}</p>;
      })}
    </div>
  );
}
