import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '../lib/useAppState'
import { galleryScreens, allCategories, type GalleryScreen } from '../data/galleryScreens'
import { GalleryPreviewModal } from './GalleryPreviewModal'
import { PhoneFrame } from './PhoneFrame'

export function ScreenGallery() {
  const navigate = useNavigate()
  const { setLabView } = useAppState()

  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [showOnlyLive, setShowOnlyLive] = useState(false)
  const [showOnlyLabLinked, setShowOnlyLabLinked] = useState(false)
  const [selectedScreen, setSelectedScreen] = useState<GalleryScreen | null>(null)

  // Powerful client-side filtering — instant & delightful + new quick filters for showcase
  const filteredScreens = useMemo(() => {
    let result = galleryScreens

    if (search.trim()) {
      const q = search.toLowerCase().trim()
      result = result.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
      )
    }

    if (activeCategory) {
      result = result.filter(s => s.category === activeCategory)
    }

    if (showOnlyLive) {
      result = result.filter(s => s.implemented)
    }

    if (showOnlyLabLinked) {
      result = result.filter(s => !!s.labView)
    }

    return result
  }, [search, activeCategory, showOnlyLive, showOnlyLabLinked])

  const implementedCount = galleryScreens.filter(s => s.implemented).length

  const handleCardClick = (screen: GalleryScreen) => {
    // Primary delightful experience: open the screen instantly inside PhoneFrame (reused from lab)
    setSelectedScreen(screen)
  }

  const handleQuickLab = (screen: GalleryScreen, e: React.MouseEvent) => {
    e.stopPropagation()
    
    // Intelligent handoff to Prototype Lab — mirrors the modal for full consistency
    if (screen.labView) {
      setLabView(screen.labView)
    }
    navigate('/lab', {
      state: {
        fromGallery: true,
        screenName: screen.title,
        targetLabView: screen.labView,
      }
    })
  }

  const closeModal = () => setSelectedScreen(null)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
      {/* Hero header — showcases Figma intelligence */}
      <div className="mb-8 sm:mb-10">
        <div className="flex flex-wrap items-baseline gap-3 mb-2">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tighter">All Screens</h1>
          <div className="text-xs sm:text-sm px-3 py-px rounded-full bg-white/5 text-white/50 border border-white/10">54 from Figma</div>
        </div>
        <p className="text-lg sm:text-xl text-white/60 max-w-3xl">
          Browse the complete Yeki VPN App UI Kit. Click any card to preview it inside the real PhoneFrame — the same component used in the Prototype Lab.
        </p>
        <div className="mt-3 text-sm text-[#7460e1]/90 flex items-center gap-4">
          <span>{implementedCount} screens have live interactive React implementations</span>
          <span className="text-white/20">•</span>
          <span>Smart “Open in Lab” with view pre-selection • Random + quick filters</span>
        </div>
      </div>

      {/* Search + Filters — lightweight but powerful */}
      <div className="sticky top-14 sm:top-16 z-40 bg-zinc-950/95 backdrop-blur py-4 sm:py-5 -mx-1 px-1 mb-5 sm:mb-6 border-b border-white/10">
        <div className="flex flex-col md:flex-row gap-3 items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search screens (e.g. Speedtest, Profile, Login, Japan...)"
            className="flex-1 bg-zinc-900 border border-white/10 focus:border-[#7460e1]/60 placeholder:text-white/30 text-white px-5 py-3 rounded-2xl outline-none text-sm"
          />
          <button
            onClick={() => { setSearch(''); setActiveCategory(null); setShowOnlyLive(false); setShowOnlyLabLinked(false) }}
            className="text-sm px-4 py-3 rounded-2xl border border-white/10 hover:bg-white/5 active:bg-white/10 active:scale-[0.985] transition-all duration-150"
          >
            Clear
          </button>
        </div>

        {/* Quick polish actions: Random (smart) + Live/Lab filters — high-impact delight */}
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <button
            onClick={() => {
              // Pick a random screen that has a Lab mapping for the smartest possible "Open in Lab" demo
              const candidates = galleryScreens.filter(s => s.labView)
              if (candidates.length === 0) return
              const rand = candidates[Math.floor(Math.random() * candidates.length)]
              // Directly perform the smart handoff (same as clicking Open Lab on a card)
              setLabView(rand.labView!)
              navigate('/lab', {
                state: { fromGallery: true, screenName: rand.title, targetLabView: rand.labView }
              })
            }}
            className="text-xs px-3.5 py-1.5 rounded-full border border-white/15 hover:bg-[#7460e1]/10 hover:border-[#7460e1]/40 active:bg-[#7460e1]/15 active:scale-[0.985] transition-all duration-150 flex items-center gap-1.5 text-[#a8a1d8]"
            title="Jump straight to a random intelligently-mapped Lab view (showcases smart navigation)"
          >
            🎲 Random in Lab
          </button>

          <button
            onClick={() => setShowOnlyLive(!showOnlyLive)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all active:scale-[0.985] duration-150 ${showOnlyLive ? 'bg-emerald-500/90 text-black border-emerald-400' : 'border-white/15 hover:bg-white/5 active:bg-white/10 text-white/70'}`}
          >
            {showOnlyLive ? '✓ ' : ''}LIVE only
          </button>

          <button
            onClick={() => setShowOnlyLabLinked(!showOnlyLabLinked)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all active:scale-[0.985] duration-150 ${showOnlyLabLinked ? 'bg-[#7460e1] text-white border-[#7460e1]' : 'border-white/15 hover:bg-white/5 active:bg-white/10 text-white/70'}`}
          >
            {showOnlyLabLinked ? '✓ ' : ''}Lab-linked
          </button>

          <div className="text-[10px] text-white/30 ml-1">({filteredScreens.length} shown)</div>
        </div>

        {/* Category chips — derived directly from Figma naming. Horizontal scroll on mobile for polish */}
        <div className="mt-4 -mx-1 px-1">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 snap-x snap-mandatory">
            <button
              onClick={() => setActiveCategory(null)}
              className={`text-xs px-4 py-1.5 rounded-full border transition-all active:scale-[0.985] duration-150 whitespace-nowrap snap-start ${!activeCategory ? 'bg-[#7460e1] text-white border-[#7460e1]' : 'border-white/15 hover:bg-white/5 active:bg-white/10 text-white/70'}`}
            >
              All ({galleryScreens.length})
            </button>
            {allCategories.map(cat => {
              const count = galleryScreens.filter(s => s.category === cat).length
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(isActive ? null : cat)}
                  className={`text-xs px-4 py-1.5 rounded-full border transition-all active:scale-[0.985] duration-150 whitespace-nowrap snap-start ${isActive ? 'bg-[#7460e1] text-white border-[#7460e1]' : 'border-white/15 hover:bg-white/5 active:bg-white/10 text-white/70'}`}
                >
                  {cat} ({count})
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Beautiful interactive grid — the heart of the new UI Kit browser */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filteredScreens.map((screen) => (
          <div
            key={screen.id}
            onClick={() => handleCardClick(screen)}
            className="group cursor-pointer rounded-3xl border border-white/10 bg-zinc-900 overflow-hidden flex flex-col hover:border-[#7460e1]/70 hover:shadow-xl hover:shadow-[#7460e1]/5 hover:-translate-y-0.5 active:scale-[0.985] transition-all duration-200"
          >
            {/* Mini Phone preview using the same PhoneFrame (lightweight instance) */}
            <div className="relative bg-black/60 p-3 flex items-center justify-center">
              <div className="scale-[0.36] origin-top pointer-events-none -my-10">
                <PhoneFrame tilt={false} showCamera={false}>
                  <div className="h-full w-full bg-[#18153a] flex flex-col items-center justify-center px-3 text-center">
                    <div className="text-[9px] uppercase tracking-[2px] text-[#7460e1]/70 mb-1">{screen.category}</div>
                    <div className="text-[11px] leading-[13px] font-semibold tracking-[-0.2px] line-clamp-3 px-2 text-white/90">
                      {screen.title}
                    </div>
                  </div>
                </PhoneFrame>
              </div>

              {/* Live badge for implemented flows */}
              {screen.implemented && (
                <div className="absolute top-3 right-3 text-[9px] px-2 py-px rounded bg-emerald-500/90 text-black font-medium tracking-wider">LIVE</div>
              )}
            </div>

            {/* Card footer with Figma name intelligence */}
            <div className="p-4 flex-1 flex flex-col">
              <div className="font-medium text-[13px] tracking-[-0.15px] leading-tight line-clamp-2 mb-1 group-hover:text-[#a8a1d8] transition-colors duration-150">
                {screen.title}
              </div>
              <div className="text-[10px] text-white/45 mt-auto flex items-center justify-between">
                <span>{screen.category}</span>
                {screen.labView && (
                  <button
                    onClick={(e) => handleQuickLab(screen, e)}
                    className="text-[10px] px-2.5 py-0.5 rounded bg-white/10 hover:bg-[#7460e1] hover:text-white active:bg-[#6652d1] active:scale-[0.96] transition-all text-white/80 hover:text-white sm:opacity-0 sm:group-hover:opacity-100"
                    title={`Smart open: pre-select “${screen.labView}” view in Prototype Lab`}
                  >
                    Open Lab
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredScreens.length === 0 && (
        <div className="text-center py-20 text-white/50">No screens match your search or filter.</div>
      )}

      {/* Footer note */}
      <div className="mt-8 sm:mt-10 text-center text-xs text-white/40">
        All 54 screens extracted live from the Figma file “Yeki - VPN App UI KIT”. Smart Open in Lab pre-selects the best matching Prototype Lab view when a mapping exists. Try the 🎲 Random button!
      </div>

      {/* The magic: clicking loads the chosen screen inside the exact same PhoneFrame used by the lab */}
      <GalleryPreviewModal
        screen={selectedScreen}
        onClose={closeModal}
      />
    </div>
  )
}
