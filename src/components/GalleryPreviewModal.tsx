import { useNavigate } from 'react-router-dom'
import { PhoneFrame } from './PhoneFrame'
import type { GalleryScreen } from '../data/galleryScreens'
import { useAppState } from '../lib/useAppState'
import { labViewLabel } from '../data/galleryScreens'
import { Crown, Check, CreditCard, Search, Play, RotateCcw, ArrowDown, ArrowUp, Zap } from 'lucide-react'

interface GalleryPreviewModalProps {
  screen: GalleryScreen | null
  onClose: () => void
}

export function GalleryPreviewModal({ screen, onClose }: GalleryPreviewModalProps) {
  const navigate = useNavigate()
  const { setLabView } = useAppState()

  if (!screen) return null

  const handleOpenInLab = () => {
    onClose()

    // SMART NAVIGATION: If this Figma screen has a mapped labView, pre-select it so sidebar highlights + correct screen shows instantly.
    // We also pass router state for rich visual feedback banner in the Lab ("Opened from Gallery").
    if (screen.labView) {
      setLabView(screen.labView)
    }

    // Small delay so modal closes cleanly before navigation.
    setTimeout(() => {
      navigate('/lab', {
        state: {
          fromGallery: true,
          screenName: screen.title,
          targetLabView: screen.labView,
        }
      })
    }, 80)
  }

  // Beautiful generic preview renderer — reuses the exact PhoneFrame from the lab
  // This makes the gallery a true interactive browser for the full 54-screen Figma kit
  const renderFigmaPreview = () => {
    const isAuth = screen.category === 'Authentication' || screen.category === 'Onboarding'
    const isHomeLike = screen.category === 'Home' || screen.title.toLowerCase().includes('connected')
    const isBilling = screen.category === 'Billing' || screen.category === 'Payments'

    return (
      <div className="h-full w-full bg-[#18153a] text-white flex flex-col overflow-hidden relative">
        {/* Simulated status bar / dynamic island area (matches PhoneFrame viewport) */}
        <div className="h-11 flex items-center justify-between px-6 pt-1 text-[10px] font-mono tracking-[1px] text-white/60 border-b border-white/10">
          <div>9:41</div>
          <div className="flex gap-1">
            <span>5G</span>
            <span>100%</span>
          </div>
        </div>

        {/* Screen-specific beautiful mock content */}
        <div className="flex-1 flex flex-col px-5 pt-6 pb-8 overflow-y-auto text-white">
          {/* Category badge */}
          <div className="inline-flex self-center items-center gap-1.5 rounded-full bg-white/5 px-3 py-0.5 text-[10px] tracking-[1.5px] text-[#a8a1d8] mb-4 border border-white/10">
            FIGMA SCREEN • {screen.category.toUpperCase()}
          </div>

          {/* Main title from Figma — the hero of the browser experience */}
          <div className="text-[21px] leading-tight font-semibold tracking-[-0.6px] mb-2 px-4 text-center">
            {screen.title}
          </div>
          <div className="text-xs text-white/40 mb-6 tracking-wide text-center">From Yeki VPN App UI Kit</div>

          {/* ========== HIGH-FIDELITY SPECIFIC PREVIEWS (4-6 key screens upgraded) ========== */}
          {/* These use realistic card layouts, typography, spacing, and icons directly inspired by ConnectedScreen, ServerListScreen, ProfileScreen, SubscriptionScreen etc. */}

          {screen.id === '22:2218' && (
            /* 1. Server List Screen, Search Inactive — realistic server cards + search */
            <div className="w-full">
              <div className="text-center mb-4">
                <div className="text-[10px] tracking-[2px] text-white/60">SERVERS</div>
                <div className="text-xl font-semibold tracking-[-0.4px] mt-0.5">Choose Location</div>
              </div>

              {/* Search bar (static visual from ServerListScreen) */}
              <div className="relative mb-4">
                <div className="w-full bg-white/10 placeholder-white/40 text-sm rounded-2xl pl-10 pr-4 py-3 border border-white/10 flex items-center text-white/50">
                  <Search className="absolute left-4 w-4 h-4 text-white/40" />
                  Search servers or countries...
                </div>
              </div>

              {/* Server cards — exact structure & styling from real ServerListScreen */}
              <div className="space-y-2 text-sm text-left">
                {[
                  { flag: '🇸🇬', name: 'Singapore', country: 'Singapore', ping: 12, load: 34, active: true },
                  { flag: '🇯🇵', name: 'Tokyo', country: 'Japan', ping: 29, load: 67, active: false },
                  { flag: '🇺🇸', name: 'Los Angeles', country: 'United States', ping: 48, load: 21, active: false },
                  { flag: '🇩🇪', name: 'Frankfurt', country: 'Germany', ping: 18, load: 52, active: false },
                ].map((srv, i) => (
                  <div key={i} className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all ${srv.active ? 'bg-[#7460e1] text-white' : 'bg-white/5'}`}>
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{srv.flag}</div>
                      <div>
                        <div className="font-medium tracking-[-0.1px]">{srv.name}</div>
                        <div className="text-[10px] opacity-70">{srv.country}</div>
                      </div>
                    </div>
                    <div className="text-right text-xs tabular-nums">
                      <div className="font-semibold">{srv.ping}ms</div>
                      <div className="opacity-60">{srv.load}% load</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-[10px] text-center text-white/40">自动选择最优节点已开启 · 47 locations</div>
            </div>
          )}

          {screen.id === '38:3005' && (
            /* 2. Profile Without Photo — clean centered avatar + menu rows */
            <div className="w-full text-left">
              <div className="flex flex-col items-center mb-6">
                <div className="w-20 h-20 rounded-full bg-zinc-700 flex items-center justify-center text-5xl mb-3 border-4 border-white/10">👤</div>
                <div className="text-2xl font-semibold tracking-[-0.3px]">Alex Chen</div>
                <div className="text-sm text-white/60">alex.chen@personal.com</div>
              </div>

              <div className="space-y-3">
                {[
                  { icon: '✏️', label: 'Edit Profile' },
                  { icon: '🔒', label: 'Change Password' },
                  { icon: '⚙️', label: 'Settings & Preferences' },
                  { icon: '💳', label: 'Billing & Plans' },
                  { icon: '🚪', label: 'Logout', danger: true },
                ].map((item, idx) => (
                  <div key={idx} className={`flex items-center gap-4 px-5 py-4 rounded-2xl ${item.danger ? 'bg-red-900/20 text-red-300' : 'bg-white/5'}`}>
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {screen.id === '38:3521' && (
            /* 3. Profile With Photo, Pro — photo avatar + pro badge + plan summary + menu (closest to Figma high-traffic profile) */
            <div className="w-full text-left">
              <div className="flex flex-col items-center mb-5">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7460e1] to-violet-600 flex items-center justify-center text-4xl mb-3 border-4 border-white/10 ring-4 ring-[#7460e1]/20">🧑‍💼</div>
                <div className="text-2xl font-semibold tracking-[-0.3px]">Alex Chen</div>
                <div className="text-sm text-white/60">alex.chen@personal.com</div>
                <div className="inline-block mt-1.5 text-[10px] px-3 py-px bg-gradient-to-r from-[#7460e1] to-violet-600 rounded-full tracking-[1px]">PRO MEMBER</div>
              </div>

              {/* Current Plan Quick Summary — mirrors ProfileScreen + Subscription */}
              <div className="mb-5 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 flex items-center justify-between text-sm">
                <div>
                  <div className="font-medium">Pro Yearly</div>
                  <div className="text-xs text-white/50">•••• 4242 • Renews in 21 days</div>
                </div>
                <div className="text-xs px-3 py-1 rounded-full bg-white/10 font-medium">Manage</div>
              </div>

              <div className="space-y-2.5 text-sm">
                {[
                  { icon: '✏️', label: 'Edit Profile' },
                  { icon: '🔒', label: 'Change Password' },
                  { icon: '📊', label: 'Statistics' },
                  { icon: '💳', label: 'Billing & Plans' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 px-5 py-3.5 rounded-2xl bg-white/5">
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {screen.id === '38:4038' && (
            /* 4. Choose Payment Method — rich payment list + plan banner from SubscriptionScreen patterns */
            <div className="w-full text-left">
              <div className="flex items-center justify-center mb-4">
                <div className="text-xl font-semibold tracking-tight">Choose Payment</div>
              </div>

              {/* Selected Plan Banner */}
              <div className="mb-4 flex items-center gap-3 bg-[#7460e1]/10 border border-[#7460e1]/30 rounded-2xl px-4 py-3">
                <Crown className="w-5 h-5 text-[#a8a1d8]" />
                <div className="flex-1">
                  <div className="text-sm font-medium">Pro Yearly</div>
                  <div className="text-xs text-white/60">$99 per year • Save 17%</div>
                </div>
              </div>

              <div className="text-[10px] uppercase tracking-[2.5px] text-white/50 mb-2 px-1">PAYMENT METHODS</div>

              <div className="space-y-2">
                {[
                  { icon: <CreditCard className="w-5 h-5" />, label: 'Visa', detail: '•••• 4242', selected: true },
                  { icon: <CreditCard className="w-5 h-5" />, label: 'Mastercard', detail: '•••• 1881', selected: false },
                  { icon: <span className="text-lg font-bold">P</span>, label: 'PayPal', detail: 'alex.chen@personal.com', selected: false },
                  { icon: <span className="text-lg"></span>, label: 'Apple Pay', detail: '•••• 4242', selected: false },
                ].map((m, idx) => (
                  <div key={idx} className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl border ${m.selected ? 'bg-white/10 border-[#7460e1] ring-1 ring-[#7460e1]/40' : 'bg-white/5 border-white/10'}`}>
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#a8a1d8]">{m.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">{m.label}</div>
                      <div className="text-xs text-white/60 truncate">{m.detail}</div>
                    </div>
                    {m.selected && <Check className="w-4 h-4 text-[#7460e1]" />}
                  </div>
                ))}
              </div>

              <div className="mt-5 text-center">
                <div className="inline-block w-full py-3 rounded-2xl bg-[#7460e1] text-sm font-medium tracking-tight">Continue to Confirm</div>
              </div>
            </div>
          )}

          {screen.id === '38:4188' && (
            /* 5. Payment Success — celebration layout with summary card (inspired by success step in SubscriptionScreen) */
            <div className="w-full flex flex-col items-center text-center pt-2">
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6 ring-1 ring-emerald-500/30">
                <Check className="w-10 h-10 text-emerald-400" />
              </div>
              <div className="text-3xl font-semibold tracking-[-1.5px] mb-2">Payment Successful</div>
              <div className="text-sm text-white/70 mb-6 max-w-[230px]">Welcome to Pro Yearly! Your subscription is now active.</div>

              {/* Summary card */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-5 w-full text-left mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-2xl bg-[#7460e1] flex items-center justify-center">
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Pro Yearly</div>
                    <div className="text-[10px] text-white/50">Active now • Renews automatically</div>
                  </div>
                </div>
                <div className="text-xs text-white/60">Full access to premium servers, priority speeds &amp; exclusive features unlocked.</div>
              </div>

              <div className="w-full py-3 rounded-2xl bg-white/10 text-sm font-medium">Back to Profile</div>
            </div>
          )}

          {screen.id === '38:4615' && (
            /* 6. My Active Yearly Plan — premium active plan card with details & actions (high-traffic billing view) */
            <div className="w-full text-left">
              <div className="text-center mb-4">
                <div className="uppercase tracking-[2px] text-xs text-white/50">MY SUBSCRIPTION</div>
                <div className="text-xl font-semibold tracking-tight mt-1">Pro Yearly</div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-5 mb-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Crown className="w-5 h-5 text-[#7460e1]" />
                      <span className="font-semibold text-lg tracking-tight">Pro Yearly</span>
                    </div>
                    <div className="text-emerald-400 text-xs mt-0.5 tracking-widest">ACTIVE • BEST VALUE</div>
                  </div>
                  <div className="text-right font-mono">
                    <div className="text-3xl font-semibold tabular-nums tracking-[-1px]">$99</div>
                    <div className="text-[10px] text-white/50 -mt-1">/ year</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm border-t border-white/10 pt-4">
                  <div>
                    <div className="text-white/50 text-xs">PAYMENT</div>
                    <div className="font-medium">•••• 4242</div>
                  </div>
                  <div>
                    <div className="text-white/50 text-xs">NEXT BILLING</div>
                    <div className="font-medium">Jun 12, 2026</div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 text-xs space-y-1.5 text-white/70">
                  <div className="flex gap-2"><Check className="w-3.5 h-3.5 mt-px text-emerald-400" /> Unlimited premium servers</div>
                  <div className="flex gap-2"><Check className="w-3.5 h-3.5 mt-px text-emerald-400" /> Priority speeds + early access</div>
                  <div className="flex gap-2"><Check className="w-3.5 h-3.5 mt-px text-emerald-400" /> 24/7 dedicated support</div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-1 py-2.5 text-center text-xs rounded-2xl bg-white/10 font-medium">Manage Payment</div>
                <div className="flex-1 py-2.5 text-center text-xs rounded-2xl border border-white/20 text-white/80 font-medium">Switch Plan</div>
              </div>
            </div>
          )}

          {screen.id === '24:1574' && (
            /* 7. Speedtest - Off — faithful static recreation of SpeedtestScreen idle: compact START gauge with exact rings/colors + server selector bar + Press Start card using Zap/Play */
            <div className="w-full text-center">
              <div className="text-[10px] tracking-[3px] text-white/50 font-medium mb-0.5">SPEED TEST</div>
              <div className="text-[20px] font-semibold tracking-[-0.8px] mb-3">Speedtest</div>

              {/* Compact gauge — scaled rings + inner purple START button from real SpeedtestScreen */}
              <div className="flex justify-center mb-3">
                <div className="relative w-[132px] h-[132px] rounded-full border-[10px] border-[#3d3664]/60 flex items-center justify-center">
                  <div className="w-[92px] h-[92px] rounded-full bg-[#a89be8] text-[#2c2a4a] flex flex-col items-center justify-center shadow-[0_0_0_10px_#a89be820]">
                    <Play size={28} className="mb-0.5 ml-0.5" />
                    <div className="font-semibold text-sm tracking-[-0.5px] leading-none" style={{ fontFamily: "'Clash Display', system-ui, sans-serif" }}>START</div>
                  </div>
                </div>
              </div>

              {/* Server bar — exact padding/typography/structure from SpeedtestScreen + ServerList */}
              <div className="mx-auto max-w-[260px] bg-white/5 backdrop-blur rounded-3xl px-3 py-2 flex items-center justify-between border border-white/10 text-xs mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-base ring-1 ring-white/20">🇸🇬</div>
                  <div className="text-left leading-tight">
                    <div className="font-medium tracking-[-0.1px]">Singapore</div>
                    <div className="text-[9px] text-white/50 -mt-0.5">12ms • Singapore</div>
                  </div>
                </div>
                <div className="px-3 py-px text-[10px] font-medium rounded-2xl border border-white/20">Change</div>
              </div>

              {/* Idle state card — direct match to real "Press Start!" panel with icon + description */}
              <div className="mx-auto max-w-[260px] bg-white/5 rounded-3xl px-4 py-5 border border-white/10 text-center">
                <div className="mx-auto mb-2 w-8 h-8 rounded-2xl bg-white/10 flex items-center justify-center text-[#a8a1d8]">
                  <Zap size={18} />
                </div>
                <div className="text-base font-semibold tracking-tight">Press Start!</div>
                <p className="mt-1 text-[10px] text-white/60">Tap to test Ping, Download &amp; Upload</p>
              </div>
            </div>
          )}

          {screen.id === '24:2084' && (
            /* 8. Speedtest - On Progress — live testing view with scaled progress arc + highlighted active row + waiting states (from real multi-phase logic) */
            <div className="w-full">
              <div className="text-center mb-1">
                <div className="text-[10px] tracking-[3px] text-white/50">SPEED TEST</div>
                <div className="text-lg font-semibold tracking-[-0.6px]">Speedtest</div>
              </div>

              {/* Compact live gauge with partial arc + LIVE indicator */}
              <div className="flex justify-center mb-1">
                <div className="relative w-[118px] h-[118px] rounded-full flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-[8px] border-[#3d3664]/60" />
                  <div className="absolute inset-[6px] rounded-full border-[5px] border-[#7460e1]/20" />
                  <svg className="absolute inset-0 -rotate-[18deg]" width="118" height="118" viewBox="0 0 118 118">
                    <circle cx="59" cy="59" r="46" fill="none" stroke="#3a345f" strokeWidth="10" strokeDasharray="289" strokeDashoffset="82" strokeLinecap="round" />
                    <circle cx="59" cy="59" r="46" fill="none" stroke="#a8a1d8" strokeWidth="10" strokeDasharray="289" strokeDashoffset="130" strokeLinecap="round" />
                  </svg>
                  <div className="relative z-10 w-[78px] h-[78px] rounded-full bg-[#25214a] border border-white/10 flex flex-col items-center justify-center">
                    <div className="text-2xl font-semibold tabular-nums tracking-[-1.5px] leading-none" style={{ fontFamily: "'Clash Display', system-ui, sans-serif" }}>32.7</div>
                    <div className="text-[10px] text-white/70 -mt-0.5">Mbps</div>
                    <div className="mt-1 flex items-center gap-1 text-[8px] tracking-[1px] text-white/50"><div className="w-1 h-1 rounded-full bg-[#a8a1d8] animate-pulse" />LIVE</div>
                  </div>
                </div>
              </div>
              <div className="text-center text-[10px] text-white/60 tracking-[1px] mb-2">Testing download… · 3.8s</div>

              {/* 3-row results panel — pixel-perfect spacing, icons, highlight from SpeedtestScreen */}
              <div className="mx-auto max-w-[250px] bg-white/5 rounded-3xl border border-white/10 px-1 py-1 text-xs">
                <div className="flex items-center justify-between px-3 py-2 rounded-3xl mx-1 bg-white/10">
                  <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-xl bg-[#7460e1] text-white flex items-center justify-center"><ArrowDown size={14} /></div><span className="font-medium">Download</span></div>
                  <span className="tabular-nums font-semibold tracking-tight">32.7 Mbps</span>
                </div>
                <div className="mx-4 h-px bg-white/10" />
                <div className="flex items-center justify-between px-3 py-2 rounded-3xl mx-1">
                  <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-xl bg-white/10 text-white/70 flex items-center justify-center"><ArrowUp size={14} /></div><span className="font-medium">Upload</span></div>
                  <span className="tabular-nums font-semibold tracking-tight text-white/70">Testing…</span>
                </div>
                <div className="mx-4 h-px bg-white/10" />
                <div className="flex items-center justify-between px-3 py-2 rounded-3xl mx-1">
                  <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-xl bg-white/10 text-white/70 flex items-center justify-center"><Zap size={14} /></div><span className="font-medium">Ping</span></div>
                  <span className="tabular-nums font-semibold tracking-tight text-white/70">Waiting</span>
                </div>
              </div>
              <div className="mt-2 text-[9px] text-center text-white/40">Singapore • Multi-phase test in progress</div>
            </div>
          )}

          {screen.id === '24:2217' && (
            /* 9. Speedtest - Done — final results view with AGAIN button, rating badge, and full numeric rows (mirrors post-test state) */
            <div className="w-full">
              <div className="text-center mb-1">
                <div className="text-[10px] tracking-[3px] text-white/50">SPEED TEST</div>
                <div className="text-lg font-semibold tracking-[-0.6px]">Speedtest</div>
              </div>

              {/* Done state compact circle */}
              <div className="flex justify-center mb-1">
                <div className="relative w-[112px] h-[112px] rounded-full flex items-center justify-center border-[8px] border-[#3d3664]/60">
                  <div className="w-[78px] h-[78px] rounded-full bg-[#a89be8] text-[#2c2a4a] flex flex-col items-center justify-center">
                    <RotateCcw size={22} className="mb-0.5" />
                    <div className="font-semibold text-xs tracking-[-0.5px]">AGAIN</div>
                  </div>
                </div>
              </div>
              <div className="text-emerald-400 text-[10px] tracking-[1.5px] font-semibold mb-1">EXCELLENT</div>

              {/* Completed results rows — exact from SpeedtestScreen done phase */}
              <div className="mx-auto max-w-[255px] bg-white/5 rounded-3xl border border-white/10 px-1 py-1 text-xs mb-2">
                <div className="flex justify-between px-3 py-[7px] rounded-3xl mx-1"><div className="flex gap-2 items-center"><div className="w-6 h-6 rounded-xl bg-white/10 flex items-center justify-center"><ArrowDown size={13} /></div><span>Download</span></div><span className="tabular-nums font-semibold">52.4 Mbps</span></div>
                <div className="mx-4 h-px bg-white/10" />
                <div className="flex justify-between px-3 py-[7px] rounded-3xl mx-1"><div className="flex gap-2 items-center"><div className="w-6 h-6 rounded-xl bg-white/10 flex items-center justify-center"><ArrowUp size={13} /></div><span>Upload</span></div><span className="tabular-nums font-semibold">18.9 Mbps</span></div>
                <div className="mx-4 h-px bg-white/10" />
                <div className="flex justify-between px-3 py-[7px] rounded-3xl mx-1"><div className="flex gap-2 items-center"><div className="w-6 h-6 rounded-xl bg-white/10 flex items-center justify-center"><Zap size={13} /></div><span>Ping</span></div><span className="tabular-nums font-semibold">14 ms</span></div>
              </div>
              <div className="text-[9px] text-center text-white/50">Test complete • Results saved to Statistics</div>
            </div>
          )}

          {screen.id === '38:3288' && (
            /* 10. Profile With Photo — photo-style avatar (initials gradient) + full menu rows directly modeled on ProfileScreen layout & styling */
            <div className="w-full text-left">
              <div className="flex flex-col items-center mb-5">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-slate-400 via-zinc-500 to-slate-700 flex items-center justify-center text-white text-3xl font-semibold tracking-[-1.5px] mb-3 border-4 border-white/10 shadow-inner">AC</div>
                <div className="text-2xl font-semibold tracking-[-0.3px]">Alex Chen</div>
                <div className="text-sm text-white/60">alex.chen@personal.com</div>
              </div>

              <div className="space-y-2.5">
                {[
                  { icon: '✏️', label: 'Edit Profile' },
                  { icon: '🔒', label: 'Change Password' },
                  { icon: '⚙️', label: 'Settings & Preferences' },
                  { icon: '💳', label: 'Billing & Plans' },
                  { icon: '🚪', label: 'Logout', danger: true },
                ].map((item, idx) => (
                  <div key={idx} className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl ${item.danger ? 'bg-red-900/20 text-red-300' : 'bg-white/5'}`}>
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {screen.id === '38:3402' && (
            /* 11. Profile With Photo, Pro — photo avatar + PRO badge + plan summary card + focused menu (reuses exact patterns from ProfileScreen + SubscriptionScreen) */
            <div className="w-full text-left">
              <div className="flex flex-col items-center mb-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7460e1] via-violet-500 to-fuchsia-500 flex items-center justify-center text-white text-3xl font-semibold tracking-[-1px] mb-3 border-4 border-white/10 ring-4 ring-[#7460e1]/20">AC</div>
                <div className="text-2xl font-semibold tracking-[-0.3px]">Alex Chen</div>
                <div className="text-sm text-white/60">alex.chen@personal.com</div>
                <div className="inline-block mt-1.5 text-[10px] px-3 py-px bg-gradient-to-r from-[#7460e1] to-violet-600 rounded-full tracking-[1px]">PRO MEMBER</div>
              </div>

              {/* Current Plan Quick Summary — mirrors ProfileScreen + existing high-fid profile preview */}
              <div className="mb-4 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 flex items-center justify-between text-sm">
                <div>
                  <div className="font-medium">Pro Yearly</div>
                  <div className="text-xs text-white/50">•••• 4242 • Renews in 21 days</div>
                </div>
                <div className="text-xs px-3 py-1 rounded-full bg-white/10 font-medium">Manage</div>
              </div>

              <div className="space-y-2 text-sm">
                {[
                  { icon: '✏️', label: 'Edit Profile' },
                  { icon: '🔒', label: 'Change Password' },
                  { icon: '📊', label: 'Statistics' },
                  { icon: '💳', label: 'Billing & Plans' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 px-5 py-3.5 rounded-2xl bg-white/5">
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========== FALLBACK GENERIC PREVIEWS (preserved & improved for other screens) ========== */}
          {screen.id !== '22:2218' && screen.id !== '38:3005' && screen.id !== '38:3521' && screen.id !== '38:4038' && screen.id !== '38:4188' && screen.id !== '38:4615' && screen.id !== '24:1574' && screen.id !== '24:2084' && screen.id !== '24:2217' && screen.id !== '38:3288' && screen.id !== '38:3402' && (
            <div className="mx-auto w-full max-w-[260px] space-y-3">
              {isAuth && (
                <>
                  <div className="h-9 bg-white/5 rounded-2xl flex items-center px-4 text-sm text-left text-white/70">Email or phone number</div>
                  <div className="h-9 bg-white/5 rounded-2xl flex items-center px-4 text-sm text-left text-white/70">Password</div>
                  <div className="h-11 mt-2 bg-[#7460e1] rounded-3xl flex items-center justify-center text-sm font-medium tracking-tight">Continue</div>
                </>
              )}

              {isHomeLike && (
                <>
                  <div className="mx-auto my-2 w-20 h-20 rounded-full bg-[#7460e1]/90 flex items-center justify-center ring-8 ring-[#7460e1]/20">
                    <div className="w-7 h-7 bg-white rounded" />
                  </div>
                  <div className="text-[42px] font-semibold tabular-nums tracking-[-3.5px] font-mono mt-1">12:48</div>
                  <div className="text-emerald-400 text-xs tracking-widest -mt-1">CONNECTED TO {screen.title.includes('Japan') ? 'JAPAN' : 'SINGAPORE'}</div>
                </>
              )}

              {screen.category === 'Speedtest' && (
                <div className="pt-4">
                  <div className="text-6xl font-semibold tracking-[-4px] tabular-nums">48.2</div>
                  <div className="text-xs text-white/50 -mt-1">Mbps • {screen.title.includes('Progress') ? 'TESTING' : 'DONE'}</div>
                  <div className="h-2 bg-white/10 rounded mt-6 overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-[#7460e1] to-violet-400" />
                  </div>
                </div>
              )}

              {screen.category === 'Servers' && (
                <div className="space-y-2 pt-3 text-left text-sm">
                  {['🇸🇬 Singapore', '🇯🇵 Tokyo', '🇺🇸 Los Angeles'].map((s, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white/5 rounded-2xl px-4 py-3">
                      <span>{s}</span>
                      <span className="text-emerald-400 text-xs">{12 + idx * 17}ms</span>
                    </div>
                  ))}
                </div>
              )}

              {(screen.category === 'Profile' || screen.category === 'Account') && (
                <div className="space-y-2 pt-4">
                  <div className="flex items-center gap-3 bg-white/5 rounded-2xl p-4 text-left">
                    <div className="w-9 h-9 rounded-full bg-white/20" />
                    <div>
                      <div className="font-medium">Alex Chen</div>
                      <div className="text-xs text-white/50">alex.chen@personal.com</div>
                    </div>
                  </div>
                  <div className="text-xs bg-white/5 py-3 rounded-2xl">Pro Member • Manage Subscription</div>
                </div>
              )}

              {isBilling && (
                <div className="pt-3 text-sm space-y-2.5 text-left">
                  <div className="bg-white/5 rounded-2xl p-4">Yearly Plan — $59.99</div>
                  <div className="bg-white/5 rounded-2xl p-4">Payment method •••• 4242</div>
                </div>
              )}

              {/* Generic fallback for any remaining screens */}
              {!isAuth && !isHomeLike && screen.category !== 'Speedtest' && screen.category !== 'Servers' && screen.category !== 'Profile' && screen.category !== 'Account' && !isBilling && (
                <div className="pt-8 pb-4 text-white/40 text-sm tracking-wider">High-fidelity Figma design ready for implementation</div>
              )}
            </div>
          )}
        </div>

        {/* Bottom bar hint */}
        <div className="p-4 text-center text-[10px] text-white/30 border-t border-white/10 tracking-[1px]">
          PREVIEW FROM FIGMA • TAP OPEN IN LAB FOR FULL EXPERIENCE
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4" onClick={onClose}>
      <div 
        className="relative w-full max-w-[420px] rounded-3xl overflow-hidden bg-zinc-950 border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 bg-zinc-950/80 backdrop-blur">
          <div className="min-w-0 pr-3">
            <div className="font-semibold tracking-tight text-lg leading-none truncate">{screen.title}</div>
            <div className="text-[11px] text-white/50 mt-1">{screen.name} · {screen.category}</div>
          </div>
          <button 
            onClick={onClose}
            className="text-white/60 hover:text-white text-xl leading-none px-2 py-1"
            aria-label="Close preview"
          >
            ×
          </button>
        </div>

        {/* The actual reusable PhoneFrame from Prototype Lab — this is the key interactive moment */}
        <div className="p-6 bg-zinc-950 flex justify-center">
          <PhoneFrame tilt={false} showCamera={false}>
            {renderFigmaPreview()}
          </PhoneFrame>
        </div>

        {/* Powerful CTAs — fulfills "Open in Prototype Lab" requirement */}
        <div className="p-5 bg-zinc-950 border-t border-white/10 flex flex-col gap-2.5">
          <button
            onClick={handleOpenInLab}
            className="w-full py-3.5 rounded-2xl bg-[#7460e1] hover:bg-[#6652d1] active:scale-[0.985] transition font-medium text-sm tracking-[-0.1px] flex items-center justify-center gap-2"
          >
            Open in Prototype Lab
            {screen.labView && labViewLabel[screen.labView] && (
              <span className="opacity-90 text-xs px-2 py-px rounded bg-white/20">→ {labViewLabel[screen.labView]}</span>
            )}
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 text-sm text-white/60 hover:text-white/90 transition"
          >
            Close preview
          </button>
          {screen.implemented && (
            <div className="text-center text-[10px] text-emerald-400/80 tracking-widest pt-1">LIVE INTERACTIVE VERSION AVAILABLE</div>
          )}
          {screen.labView && (
            <div className="text-center text-[10px] text-white/40 pt-1 tracking-wider">
              Sidebar will highlight • Instant jump to matching view
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
