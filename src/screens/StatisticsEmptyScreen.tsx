import { useAppState } from '../lib/useAppState'
import { BottomNav } from '../components/BottomNav'
import { BarChart3, Play, Wifi, TrendingUp, Clock } from 'lucide-react'

interface StatisticsEmptyScreenProps {
  onNavigate?: (tab: 'home' | 'server' | 'speedtest' | 'stats' | 'profile' | 'subscription' | 'edit-profile' | 'change-password' | 'logout' | 'stats-empty') => void
}

export function StatisticsEmptyScreen({ onNavigate }: StatisticsEmptyScreenProps) {
  const { currentServer } = useAppState()

  return (
    <div className="h-full flex flex-col pt-9 pb-16 text-white bg-[#18153a]">
      {/* Header */}
      <div className="px-5 text-center mb-6">
        <div className="text-xs tracking-[2.5px] text-white/50">STATISTICS</div>
        <div className="text-2xl font-semibold tracking-tight mt-1">This Week</div>
      </div>

      {/* Large, beautiful empty state visual */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 -mt-4">
        <div className="relative mb-8">
          {/* Decorative rings + icon */}
          <div className="w-[148px] h-[148px] rounded-full border-[14px] border-white/5" />
          <div className="absolute inset-[18px] rounded-full border-[9px] border-white/5" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center ring-1 ring-white/10">
              <BarChart3 className="w-10 h-10 text-white/30" />
            </div>
          </div>
        </div>

        <div className="text-center max-w-[290px]">
          <div className="text-[26px] font-semibold tracking-[-0.8px] mb-3">No data yet</div>
          <p className="text-[15px] leading-relaxed text-white/65">
            Your usage statistics and speed history will appear here once you connect and run tests.
          </p>
        </div>

        {/* Quick stats preview placeholders (subtle) */}
        <div className="mt-9 w-full max-w-[300px] grid grid-cols-3 gap-3 opacity-40">
          {[
            { icon: <Clock className="w-4 h-4" />, label: 'Time', value: '—' },
            { icon: <TrendingUp className="w-4 h-4" />, label: 'Sessions', value: '—' },
            { icon: <Wifi className="w-4 h-4" />, label: 'Avg Ping', value: '—' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white/5 rounded-2xl py-3.5 text-center border border-white/5">
              <div className="flex justify-center mb-1 text-white/50">{item.icon}</div>
              <div className="text-xs text-white/40">{item.label}</div>
              <div className="font-mono text-sm text-white/30 mt-0.5">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Prominent CTAs — high value actions */}
      <div className="px-5 pb-3 space-y-3">
        <button
          onClick={() => onNavigate?.('speedtest')}
          className="w-full flex items-center justify-center gap-3 py-4 bg-[#7460e1] active:bg-[#6652d1] rounded-2xl font-semibold text-lg tracking-[-0.2px] transition active:scale-[0.985]"
        >
          <Play className="w-5 h-5" /> Run a Speed Test
        </button>

        <button
          onClick={() => onNavigate?.('server')}
          className="w-full flex items-center justify-center gap-3 py-4 border border-white/20 active:bg-white/5 rounded-2xl font-medium text-white/90 transition active:scale-[0.985]"
        >
          <Wifi className="w-5 h-5" /> Connect to {currentServer.name}
        </button>
      </div>

      <div className="px-5 pb-1 text-center text-[10px] text-white/40">
        Statistics update automatically after connections &amp; tests
      </div>

      <BottomNav 
        active="stats" 
        onChange={(tab) => onNavigate?.(tab)} 
      />
    </div>
  )
}
