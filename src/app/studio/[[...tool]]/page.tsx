import StudioLoader from './StudioLoader';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return [{ tool: [] }];
}

export { metadata, viewport } from 'next-sanity/studio';

export default function StudioPage() {
  return <StudioLoader />;
}
