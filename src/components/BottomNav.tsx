

type Tab = 'home' | 'server' | 'speedtest' | 'stats' | 'profile'

interface BottomNavProps {
  active: Tab
  onChange: (tab: Tab) => void
}

export function BottomNav({ active, onChange }: BottomNavProps) {
  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: 'home', label: 'Home', icon: '⌂' },
    { key: 'server', label: 'Servers', icon: '🌐' },
    { key: 'speedtest', label: 'Test', icon: '📊' },
    { key: 'stats', label: 'Stats', icon: '📈' },
    { key: 'profile', label: 'Me', icon: '👤' },
  ]

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[58px] bg-[#0f0d22]/95 backdrop-blur border-t border-white/10 flex items-center justify-around text-[13px] z-50">
      {tabs.map((tab) => {
        const isActive = active === tab.key
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`flex flex-col items-center justify-center gap-0.5 w-12 transition-all active:scale-95 ${isActive ? 'text-[#a8a1d8]' : 'text-white/55'}`}
          >
            <div className="text-xl leading-none">{tab.icon}</div>
            <div className={`text-[10px] tracking-tight ${isActive ? 'font-medium' : ''}`}>{tab.label}</div>
          </button>
        )
      })}
    </div>
  )
}
