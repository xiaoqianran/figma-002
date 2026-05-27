import { useState } from 'react'
import { useAppState } from '../lib/useAppState'
import { BottomNav } from '../components/BottomNav'
import { Search, X, MapPin, RefreshCw } from 'lucide-react'

interface ServerListScreenProps {
  onNavigate?: (tab: 'home' | 'server' | 'speedtest' | 'stats' | 'profile' | 'subscription' | 'edit-profile' | 'change-password' | 'logout' | 'stats-empty') => void
}

export function ServerListScreen({ onNavigate }: ServerListScreenProps) {
  const { servers, currentServer, changeServer } = useAppState()
  const [searchQuery, setSearchQuery] = useState('')

  // Real filtering: match against name or country (case-insensitive)
  const filteredServers = servers.filter((server) => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return true
    return (
      server.name.toLowerCase().includes(q) ||
      server.country.toLowerCase().includes(q)
    )
  })

  const hasQuery = searchQuery.trim().length > 0
  const isEmpty = filteredServers.length === 0

  const clearSearch = () => setSearchQuery('')

  return (
    <div className="h-full flex flex-col pt-10 pb-16 text-white bg-[#18153a]">
      <div className="px-5">
        <div className="text-center">
          <div className="text-sm tracking-[2px] text-white/60">SERVERS</div>
          <div className="text-2xl font-semibold mt-1 tracking-[-0.5px]">Choose Location</div>
        </div>

        {/* Fully functional search bar with clear button */}
        <div className="mt-5 mb-3 relative">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search servers or countries..." 
            className="w-full bg-white/10 placeholder-white/40 text-sm rounded-2xl pl-10 pr-10 py-3 outline-none border border-white/10 focus:border-[#7460e1] transition"
          />
          <Search className="absolute left-4 top-3.5 text-white/40 w-4 h-4" />
          {hasQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3.5 top-3.5 text-white/50 hover:text-white/80 active:text-white transition p-1 rounded-full hover:bg-white/10"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Result count */}
        {hasQuery && !isEmpty && (
          <div className="text-[11px] text-white/50 mb-2 px-1">
            {filteredServers.length} result{filteredServers.length !== 1 ? 's' : ''} for “{searchQuery.trim()}”
          </div>
        )}
      </div>

      {/* Server list or Empty state */}
      <div className="flex-1 overflow-auto px-4 pb-6">
        {!isEmpty ? (
          <div className="space-y-2 text-sm">
            {filteredServers.map((server) => {
              const isActive = server.id === currentServer.id
              return (
                <button
                  key={server.id}
                  onClick={() => changeServer(server)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all active:scale-[0.985]
                    ${isActive 
                      ? 'bg-[#7460e1] text-white shadow-inner' 
                      : 'bg-white/5 hover:bg-white/10 active:bg-white/10'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{server.flag}</div>
                    <div className="text-left">
                      <div className="font-medium tracking-[-0.1px]">{server.name}</div>
                      <div className="text-[10px] opacity-70">{server.country}</div>
                    </div>
                  </div>
                  <div className="text-right text-xs tabular-nums">
                    <div className="font-semibold">{server.ping}ms</div>
                    <div className="opacity-60">{server.load}% load</div>
                  </div>
                </button>
              )
            })}
          </div>
        ) : (
          /* High-quality empty state for no search results (inspired by Figma 30 - Server List Empty) */
          <div className="flex flex-col items-center justify-center h-full text-center px-6 -mt-8">
            <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-6 ring-1 ring-white/10">
              <MapPin className="w-9 h-9 text-white/40" />
            </div>
            <div className="text-2xl font-semibold tracking-[-0.8px] mb-2">No servers found</div>
            <p className="text-white/60 text-[15px] max-w-[260px] leading-relaxed mb-6">
              We couldn’t find any servers matching “{searchQuery.trim()}”. Try searching for a country or city name.
            </p>
            <button
              onClick={clearSearch}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 active:bg-white/20 text-sm font-medium transition active:scale-[0.985]"
            >
              <RefreshCw className="w-4 h-4" /> Clear search & show all
            </button>
            <div className="mt-8 text-[10px] text-white/40 tracking-wider">TIP: Try “Singapore”, “Japan” or “USA”</div>
          </div>
        )}
      </div>

      <div className="p-4 text-[10px] text-center text-white/40 border-t border-white/10">
        自动选择最优节点已开启 · {servers.length} locations available
      </div>

      <BottomNav 
        active="server" 
        onChange={(tab) => onNavigate?.(tab)} 
      />
    </div>
  )
}
