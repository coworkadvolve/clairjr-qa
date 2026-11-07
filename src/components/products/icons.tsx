// Line icons from the client's prototype.
const common = { viewBox: '0 0 24 24', 'aria-hidden': true } as const;

export function StripIcon({ label }: { label: string }) {
  switch (label) {
    case 'Input':
      return (
        <svg {...common}>
          <path d="M13 2 4 14h7l-1 8 9-12h-7z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        </svg>
      );
    case 'Protection':
      return (
        <svg {...common}>
          <path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z" fill="none" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      );
    case 'Control':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
          <path d="M12 3.5a8.5 8.5 0 0 1 0 17z" fill="currentColor" />
        </svg>
      );
    case 'Application':
      return (
        <svg {...common}>
          <path d="M4 11 12 4l8 7v9H4z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path
            d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 2-2s-1-1.5-1-2.5 1-1.5 2-1.5h2a4 4 0 0 0 4-4c0-4.4-4-8-9-8z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <circle cx="7.5" cy="11" r="1.3" fill="currentColor" />
          <circle cx="10" cy="7" r="1.3" fill="currentColor" />
          <circle cx="15" cy="7" r="1.3" fill="currentColor" />
        </svg>
      );
  }
}

const GRADIENTS = (
  <defs>
    <linearGradient id="dD" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#FFB36B" stopOpacity=".95" />
      <stop offset="1" stopColor="#FFB36B" stopOpacity=".1" />
    </linearGradient>
    <linearGradient id="dU" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stopColor="#FFB36B" stopOpacity=".95" />
      <stop offset="1" stopColor="#FFB36B" stopOpacity=".1" />
    </linearGradient>
  </defs>
);

/** Small light-distribution diagram: direct, indirect (uplight) or both. */
export function DistributionIcon({ kind }: { kind: string }) {
  const k = kind.toLowerCase();
  const up = /indirect \(uplight\)|^indirect/.test(k);
  const both = /direct-indirect|up and down|both/.test(k);
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      {GRADIENTS}
      {both ? (
        <>
          <path d="M12 17h16l8-14H4z" fill="url(#dU)" />
          <rect x="12" y="17" width="16" height="6" fill="#2c2c2c" />
          <path d="M12 23h16l8 14H4z" fill="url(#dD)" />
        </>
      ) : up ? (
        <>
          <path d="M12 28h16l8-24H4z" fill="url(#dU)" />
          <rect x="12" y="28" width="16" height="6" fill="#2c2c2c" />
        </>
      ) : (
        <>
          <rect x="12" y="6" width="16" height="6" fill="#2c2c2c" />
          <path d="M12 12h16l8 24H4z" fill="url(#dD)" />
        </>
      )}
    </svg>
  );
}
