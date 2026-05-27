import { useAppState } from '../lib/useAppState'
import { Shield, Zap, Globe } from 'lucide-react'

interface WelcomeScreenProps {
  onNavigate?: (target: 'connected') => void
}

export function WelcomeScreen({ onNavigate }: WelcomeScreenProps) {
  const { userProfile } = useAppState()

  const handleEnterApp = () => {
    onNavigate?.('connected')
  }

  return (
    <div className="h-full flex flex-col bg-[#18153a] text-white">
      {/* Subtle top ornament bar like splash / onboarding */}
      <div className="h-1.5 bg-gradient-to-r from-[#7460e1] via-violet-500 to-[#7460e1]" />

      <div className="flex-1 flex flex-col items-center justify-center px-7 pt-8 text-center">
        {/* Hero mark */}
        <div className="w-20 h-20 rounded-3xl bg-[#7460e1]/10 ring-1 ring-[#7460e1]/30 flex items-center justify-center mb-8">
          <span className="text-[52px] font-bold tracking-[-3px] text-[#a8a1d8]">Y</span>
        </div>

        <div className="text-4xl font-semibold tracking-[-1.8px] mb-2">Welcome to Yeki</div>
        <div className="text-xl text-white/70 tracking-tight mb-8">The fastest, most private VPN.</div>

        {/* Three distinct benefit highlights — clean, high quality, Figma-aligned */}
        <div className="w-full max-w-[300px] space-y-3 mb-9">
          {[
            { icon: <Shield className="w-4 h-4" />, title: 'Military-grade encryption', desc: '256-bit AES + WireGuard' },
            { icon: <Zap className="w-4 h-4" />, title: 'Lightning-fast speeds', desc: 'Optimized global backbone' },
            { icon: <Globe className="w-4 h-4" />, title: '50+ countries', desc: 'Including obfuscated servers' },
          ].map((b, i) => (
            <div key={i} className="flex gap-3.5 items-start bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-left">
              <div className="mt-0.5 text-[#7460e1]">{b.icon}</div>
              <div>
                <div className="font-medium text-[15px] tracking-tight">{b.title}</div>
                <div className="text-sm text-white/55">{b.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-xs text-white/40 max-w-[240px]">
          Your connection is private by design. No logs. No tracking.
        </div>
      </div>

      {/* Bottom CTAs */}
      <div className="px-5 pb-8 pt-2 space-y-3">
        <button
          onClick={handleEnterApp}
          className="w-full py-4 rounded-2xl bg-[#7460e1] active:bg-[#6652d1] font-semibold text-lg tracking-[-0.2px] transition active:scale-[0.985] shadow-sm"
        >
          Enter the App
        </button>

        <button
          onClick={handleEnterApp}
          className="w-full py-3 text-sm font-medium text-white/60 active:text-white/90 transition"
        >
          {userProfile.isPro ? 'Continue as Pro Member' : 'Start with Free plan'}
        </button>

        <div className="text-center text-[10px] text-white/30 tracking-[1px] pt-2">
          30-DAY MONEY BACK • NO CREDIT CARD NEEDED TO EXPLORE
        </div>
      </div>
    </div>
  )
}
