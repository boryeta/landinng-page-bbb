const ITEMS = [
  'LOVABLE',
  'CLAUDE AI',
  'THREE.JS',
  'REACT',
  'GSAP',
  'NEXT.JS',
  'FIGMA',
  'SUPABASE',
  'TAILWIND CSS',
]

function TickerContent() {
  return (
    <div className="flex shrink-0 items-center">
      {ITEMS.map((item) => (
        <span
          key={item}
          className="flex items-center whitespace-nowrap font-syne text-[0.85rem] font-bold uppercase tracking-[0.1em] text-blanco"
        >
          {item}
          <span className="mx-4 text-blanco/70">·</span>
        </span>
      ))}
    </div>
  )
}

export default function Ticker() {
  return (
    <div className="ticker w-full overflow-hidden bg-azul py-3">
      <div className="ticker-track">
        {/* Two identical copies for a seamless -50% loop */}
        <TickerContent />
        <TickerContent />
      </div>
    </div>
  )
}
