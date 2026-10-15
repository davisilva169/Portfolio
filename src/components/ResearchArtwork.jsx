// Mathematical line studies used as covers, rather than research data.
export default function ResearchArtwork({ kind = 'PoincareMaps' }) {
  return <svg className="research-artwork" viewBox="0 0 240 160" aria-hidden="true">
    <rect width="240" height="160" fill="#0A0A0A" />
    {kind === 'PoincareMaps' ? Array.from({ length: 15 }, (_, i) =>
      <ellipse key={i} cx="120" cy="80" rx={14 + i * 6.5} ry={5 + i * 3.6} transform="rotate(-25 120 80)" fill="none" stroke={i % 3 === 0 ? '#FFE9C7' : '#F2A900'} strokeWidth="0.7" opacity={0.95 - i * 0.035} />
    ) : kind === 'UniformFragmentation' ? Array.from({ length: 25 }, (_, i) =>
      <path key={i} d={`M120 14 L${14 + i * 8.8} 80 L${10 + i * 9.1} 146`} fill="none" stroke={i % 4 === 0 ? '#FFE9C7' : '#F2A900'} strokeWidth="0.8" opacity="0.65" />
    ) : Array.from({ length: 18 }, (_, i) =>
      <path key={i} d={`M${16 + i * 12} 145 Q${110 + (i - 9) * 3} 115 120 20 Q${140 + (i - 9) * 3} 115 ${224 - i * 12} 145`} fill="none" stroke={i % 3 === 0 ? '#FFE9C7' : '#F2A900'} strokeWidth="0.8" opacity="0.7" />
    )}
  </svg>;
}
