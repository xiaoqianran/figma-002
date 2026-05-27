import { useAppState } from '../lib/useAppState'
import { BottomNav } from '../components/BottomNav'

interface StatisticsScreenProps {
  onNavigate?: (tab: 'home' | 'server' | 'speedtest' | 'stats' | 'profile' | 'subscription' | 'edit-profile' | 'change-password' | 'logout' | 'stats-empty') => void
}

export function StatisticsScreen({ onNavigate }: StatisticsScreenProps) {
  const { currentServer, latestSpeedtest } = useAppState()

  return (
    <div className="h-full pt-9 px-5 text-white pb-16">
      <div className="text-center mb-6">
        <div className="text-xs tracking-[2.5px] text-white/50">STATISTICS</div>
        <div className="text-2xl font-semibold tracking-tight mt-1">This Week</div>
      </div>

      {/* Connection Stats */}
      <div className="bg-white/5 rounded-3xl p-4 mb-4">
        <div className="text-xs text-white/60 mb-3 px-1">CONNECTION</div>
        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            { label: 'Total Time', value: '14h 27m' },
            { label: 'Sessions', value: '23' },
            { label: 'Avg Ping', value: `${currentServer.ping}ms` },
          ].map((item, i) => (
            <div key={i} className="bg-white/5 rounded-2xl py-3">
              <div className="text-xl font-semibold tabular-nums">{item.value}</div>
              <div className="text-[10px] text-white/50 mt-0.5">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Speedtest Result (dynamic) — premium data-rich card */}
      {latestSpeedtest ? (
        <div className="bg-[#7460e1]/10 border border-[#7460e1]/30 rounded-3xl p-4 mb-4">
          <div className="flex justify-between items-center px-1 mb-2.5">
            <div>
              <div className="text-xs text-[#a8a1d8]">LATEST SPEEDTEST</div>
              <div className="text-[10px] text-white/50">
                {new Date(latestSpeedtest.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {currentServer.name}
              </div>
            </div>
            <button 
              onClick={() => onNavigate?.('speedtest')}
              className="text-xs px-3 py-1 bg-white/10 hover:bg-white/15 active:bg-white/20 rounded-full transition"
            >
              Retest
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-white/5 rounded-2xl py-2.5">
              <div className="text-xl font-semibold tabular-nums tracking-tighter">{latestSpeedtest.ping}</div>
              <div className="text-[10px] text-white/50 -mt-0.5">Ping <span className="font-mono">ms</span></div>
            </div>
            <div className="bg-white/5 rounded-2xl py-2.5">
              <div className="text-xl font-semibold tabular-nums tracking-tighter text-sky-400">{latestSpeedtest.download.toFixed(1)}</div>
              <div className="text-[10px] text-white/50 -mt-0.5">Download <span className="font-mono">Mbps</span></div>
            </div>
            <div className="bg-white/5 rounded-2xl py-2.5">
              <div className="text-xl font-semibold tabular-nums tracking-tighter text-emerald-400">{latestSpeedtest.upload.toFixed(1)}</div>
              <div className="text-[10px] text-white/50 -mt-0.5">Upload <span className="font-mono">Mbps</span></div>
            </div>
          </div>
        </div>
      ) : (
        <div 
          onClick={() => onNavigate?.('speedtest')}
          className="bg-white/5 hover:bg-white/10 active:bg-white/15 transition rounded-3xl p-4 mb-4 border border-white/10 cursor-pointer"
        >
          <div className="text-xs text-white/60 mb-1 px-1">NO SPEEDTEST YET</div>
          <div className="text-sm">Run a full speed test from the <span className="font-medium text-[#a8a1d8]">Test</span> tab to see live results here.</div>
        </div>
      )}

      {/* Speed Stats */}
      <div className="bg-white/5 rounded-3xl p-4">
        <div className="text-xs text-white/60 mb-3 px-1">SPEED STATS</div>
        
        <div className="space-y-4">
          {[
            { label: 'Peak Download', value: '68.4 Mbps', color: 'text-sky-400' },
            { label: 'Average Download', value: '41.2 Mbps', color: 'text-sky-300' },
            { label: 'Peak Upload', value: '29.7 Mbps', color: 'text-emerald-400' },
          ].map((stat, idx) => (
            <div key={idx} className="flex justify-between items-baseline px-1">
              <div className="text-sm text-white/70">{stat.label}</div>
              <div className={`font-semibold tabular-nums ${stat.color}`}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Simple visual bar chart simulation */}
        <div className="mt-5 pt-4 border-t border-white/10">
          <div className="text-[10px] text-white/50 mb-2 px-1">Daily Average Speed (Mbps)</div>
          <div className="flex items-end gap-1.5 h-20 px-1">
            {[42, 51, 38, 67, 55, 48, 61].map((h, i) => (
              <div key={i} className="flex-1 bg-[#7460e1]/70 rounded-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="flex justify-between text-[9px] text-white/40 mt-1 px-0.5">
            <div>Mon</div><div>Sun</div>
          </div>
        </div>
      </div>

      <BottomNav 
        active="stats" 
        onChange={(tab) => onNavigate?.(tab)} 
      />
    </div>
  )
}
