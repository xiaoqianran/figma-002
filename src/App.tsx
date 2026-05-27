import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { PhoneFrame } from './components/PhoneFrame'
import { Hero } from './components/Hero'
import { DesignSystem } from './components/DesignSystem'
import { ScreenGallery } from './components/ScreenGallery'

import { ConnectedScreen } from './screens/ConnectedScreen'
import { SpeedtestScreen } from './screens/SpeedtestScreen'
import { ServerListScreen } from './screens/ServerListScreen'
import { ProfileScreen } from './screens/ProfileScreen'
import { StatisticsScreen } from './screens/StatisticsScreen'
import { StatisticsEmptyScreen } from './screens/StatisticsEmptyScreen'
import { SubscriptionScreen } from './screens/SubscriptionScreen'
import { EditProfileScreen } from './screens/EditProfileScreen'
import { ChangePasswordScreen } from './screens/ChangePasswordScreen'
import { LogoutConfirmationScreen } from './screens/LogoutConfirmationScreen'
import { SettingsScreen } from './screens/SettingsScreen'
import { SubscriptionCancelScreen } from './screens/SubscriptionCancelScreen'
import { WelcomeScreen } from './screens/WelcomeScreen'
import { AppStateProvider, useAppState, type LabView } from './lib/useAppState'
import { labViewLabel } from './data/galleryScreens'

// Polished Reset button — now uses the proper non-reload resetDemoState
function ResetButton() {
  const { resetDemoState } = useAppState()
  return (
    <button
      onClick={resetDemoState}
      className="px-4 py-2 text-sm rounded-full border border-white/20 hover:bg-white/5 active:bg-white/10 active:scale-[0.985] transition-all duration-150 flex items-center gap-2"
      title="Instantly resets all Lab state (connection, speeds, profile, subscription, speedtest, view) — no page reload"
    >
      <span>↺ Reset Lab</span>
    </button>
  )
}

// Dedicated Prototype Lab component — pulls labView + resetKey + setLabView from global context.
// This enables localStorage persistence + proper resetKey-driven remount for all screens.
function PrototypeLab() {
  const { labView, setLabView, resetKey } = useAppState()
  const location = useLocation()

  // Gallery Intelligence: read router state passed by smart "Open in Lab" actions
  const galleryIntent = (location.state as { fromGallery?: boolean; screenName?: string; targetLabView?: string } | null) || null
  const fromGallery = !!galleryIntent?.fromGallery
  const galleryScreenName = galleryIntent?.screenName as string | undefined
  const galleryTarget = galleryIntent?.targetLabView as string | undefined

  // Local dismiss for the connection banner (keeps experience clean on further interactions)
  const [showGalleryBanner, setShowGalleryBanner] = useState(true)

  // Unified navigation helper passed to all lab screens.
  // Translates BottomNav tabs ('home', 'server', ...) and internal calls to correct LabView.
  // This makes BottomNav fully functional and consistent across every screen in the Lab.
  const navigateInLab = (target: string) => {
    const map: Record<string, LabView> = {
      // BottomNav tab names (from BottomNav + screen onChange) → views
      'home': 'connected',
      'server': 'servers',
      'speedtest': 'speedtest',
      'stats': 'stats',
      'profile': 'profile',
      'subscription': 'subscription',
      // Direct / extended views (sidebar, edit flows, change password, logout, empty states)
      'connected': 'connected',
      'servers': 'servers',
      'edit-profile': 'edit-profile',
      'change-password': 'change-password',
      'logout': 'logout',
      'stats-empty': 'stats-empty',
      // New supporting screens (Final Screens batch)
      'settings': 'settings',
      'subscription-cancel': 'subscription-cancel',
      'welcome': 'welcome',
    }
    const next = map[target] ?? 'connected'
    setLabView(next)
    // If user manually navigates inside Lab after a gallery jump, hide the banner
    if (showGalleryBanner) setShowGalleryBanner(false)
  }

  // Elegant "Gallery → Lab" connection feedback banner (showcase quality)
  const GalleryConnectionBanner = fromGallery && showGalleryBanner ? (
    <div className="mb-6 -mx-1 px-4 py-3 rounded-2xl bg-gradient-to-r from-[#7460e1]/15 via-[#7460e1]/10 to-transparent border border-[#7460e1]/30 flex items-center gap-3 text-sm">
      <div className="flex-1 flex items-center gap-2 text-[#a8a1d8]">
        <span className="text-base">✨</span>
        <span>
          <strong>Smart Gallery Link</strong>
          {galleryScreenName && <>: opened “{galleryScreenName}”</>}
          {galleryTarget && (labViewLabel as Record<string, string>)[galleryTarget] && <> → <span className="font-medium text-white/90">{(labViewLabel as Record<string, string>)[galleryTarget]}</span></>}
        </span>
      </div>
      <Link 
        to="/gallery" 
        className="text-xs px-3 py-1 rounded-full border border-white/15 hover:bg-white/5 active:bg-white/10 active:scale-[0.985] transition-all duration-150 whitespace-nowrap"
      >
        Continue exploring in Gallery
      </Link>
      <button 
        onClick={() => setShowGalleryBanner(false)} 
        className="text-white/50 hover:text-white px-1 text-lg leading-none"
        aria-label="Dismiss banner"
      >
        ×
      </button>
    </div>
  ) : null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tighter">Prototype Lab</h1>
          <p className="text-base sm:text-lg lg:text-xl text-white/60 mt-1 sm:mt-2">在真实 iPhone 14 Pro 模拟器中体验完整交互流程</p>
        </div>
        <div className="flex items-center gap-4">
          <ResetButton />
          <div className="text-sm text-white/50">v0.9 — 持续构建中</div>
        </div>
      </div>

      {/* Gallery Intelligence Banner — appears only on smart "Open in Lab" navigation from ScreenGallery */}
      {GalleryConnectionBanner}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Sidebar - Screen Selector */}
        <div className="lg:col-span-3">
          <div className="bg-zinc-900 border border-white/10 rounded-3xl p-4 sm:p-5 lg:p-6 lg:sticky lg:top-24">
            <div className="text-[10px] sm:text-xs uppercase tracking-widest text-white/40 mb-2 sm:mb-3">核心真实流程</div>
            <div className="text-[9px] sm:text-[10px] text-white/40 mb-2 sm:mb-3 leading-tight">
              Sidebar highlights the active view. Gallery “Open in Lab” intelligently pre-selects the best match.
            </div>
            
            <div className="space-y-0.5 sm:space-y-1 text-sm">
              <button 
                onClick={() => setLabView('connected')}
                className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-2xl transition-all duration-150 active:scale-[0.985] ${labView === 'connected' ? 'bg-white/10 font-medium ring-1 ring-white/10' : 'hover:bg-white/5 active:bg-white/10 hover:ring-1 hover:ring-white/5'}`}
              >
                主界面 - 已连接
              </button>
              <button 
                onClick={() => setLabView('speedtest')}
                className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-2xl transition-all duration-150 active:scale-[0.985] ${labView === 'speedtest' ? 'bg-white/10 font-medium ring-1 ring-white/10' : 'hover:bg-white/5 active:bg-white/10 hover:ring-1 hover:ring-white/5'}`}
              >
                Speedtest 完整流程
              </button>
              <button 
                onClick={() => setLabView('servers')}
                className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-2xl transition-all duration-150 active:scale-[0.985] ${labView === 'servers' ? 'bg-white/10 font-medium' : 'hover:bg-white/5 active:bg-white/10'}`}
              >
                服务器列表
              </button>
              <button 
                onClick={() => setLabView('stats')}
                className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-2xl transition-all duration-150 active:scale-[0.985] ${labView === 'stats' ? 'bg-white/10 font-medium' : 'hover:bg-white/5 active:bg-white/10'}`}
              >
                统计数据
              </button>
              <button 
                onClick={() => setLabView('profile')}
                className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-2xl transition-all duration-150 active:scale-[0.985] ${labView === 'profile' ? 'bg-white/10 font-medium ring-1 ring-white/10' : 'hover:bg-white/5 active:bg-white/10 hover:ring-1 hover:ring-white/5'}`}
              >
                个人资料
              </button>
              <button 
                onClick={() => setLabView('subscription')}
                className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-2xl transition-all duration-150 active:scale-[0.985] ${labView === 'subscription' ? 'bg-white/10 font-medium' : 'hover:bg-white/5 active:bg-white/10'}`}
              >
                Pro 订阅
              </button>
            </div>

            <div className="my-3 border-t border-white/10" />
            <div className="text-xs uppercase tracking-widest text-white/40 mb-1.5 px-1">Account Flows</div>
            <div className="space-y-0.5 sm:space-y-1 text-sm">
              <button 
                onClick={() => setLabView('edit-profile')}
                className={`w-full text-left px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-2xl transition-all duration-150 active:scale-[0.985] text-sm ${labView === 'edit-profile' ? 'bg-white/10 font-medium' : 'hover:bg-white/5 active:bg-white/10'}`}
              >
                ✏️ Edit Profile + Photo
              </button>
              <button 
                onClick={() => setLabView('change-password')}
                className={`w-full text-left px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-2xl transition-all duration-150 active:scale-[0.985] text-sm ${labView === 'change-password' ? 'bg-white/10 font-medium' : 'hover:bg-white/5 active:bg-white/10'}`}
              >
                🔒 Change Password
              </button>
              <button 
                onClick={() => setLabView('settings')}
                className={`w-full text-left px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-2xl transition-all duration-150 active:scale-[0.985] text-sm ${labView === 'settings' ? 'bg-white/10 font-medium' : 'hover:bg-white/5 active:bg-white/10'}`}
              >
                ⚙️ Settings &amp; Preferences
              </button>
              <button 
                onClick={() => setLabView('logout')}
                className={`w-full text-left px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-2xl transition-all duration-150 active:scale-[0.985] text-sm ${labView === 'logout' ? 'bg-white/10 font-medium' : 'hover:bg-white/5 active:bg-white/10'}`}
              >
                🚪 Logout Confirmation
              </button>
            </div>

            <div className="my-3 border-t border-white/10" />
            <div className="text-xs uppercase tracking-widest text-white/40 mb-1.5 px-1">Empty States &amp; Edge Cases</div>
            <div className="space-y-0.5 sm:space-y-1 text-sm">
              <button 
                onClick={() => setLabView('stats-empty')}
                className={`w-full text-left px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-2xl transition-all duration-150 active:scale-[0.985] text-sm ${labView === 'stats-empty' ? 'bg-white/10 font-medium' : 'hover:bg-white/5 active:bg-white/10'}`}
              >
                📊 Statistics (Empty)
              </button>
              <div className="px-3 sm:px-4 py-1 text-[9px] sm:text-[10px] text-white/40">
                Server search empty state is built into the live Server List
              </div>
            </div>

            {/* New high-value supporting & edge-case screens */}
            <div className="my-3 border-t border-white/10" />
            <div className="text-xs uppercase tracking-widest text-white/40 mb-1.5 px-1">Other / Supporting</div>
            <div className="space-y-0.5 sm:space-y-1 text-sm">
              <button 
                onClick={() => setLabView('welcome')}
                className={`w-full text-left px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-2xl transition-all duration-150 active:scale-[0.985] text-sm ${labView === 'welcome' ? 'bg-white/10 font-medium' : 'hover:bg-white/5 active:bg-white/10'}`}
              >
                🎉 Welcome / Onboarding
              </button>
              <button 
                onClick={() => setLabView('subscription-cancel')}
                className={`w-full text-left px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-2xl transition-all duration-150 active:scale-[0.985] text-sm ${labView === 'subscription-cancel' ? 'bg-white/10 font-medium' : 'hover:bg-white/5 active:bg-white/10'}`}
              >
                📉 Cancel Pro Subscription
              </button>
            </div>

            {/* NEW: Helpful non-intrusive "How to explore" section for polished demo experience */}
            <div className="my-4 sm:my-5 border-t border-white/10 pt-3 sm:pt-4">
              <div className="text-[9px] sm:text-[10px] uppercase tracking-[1.5px] text-white/40 mb-1.5 sm:mb-2 px-1">How to explore the Lab</div>
              <div className="text-[9px] sm:text-[10px] text-white/55 leading-[1.3] sm:leading-[1.35] space-y-0.5 sm:space-y-[4px] px-1">
                <div>→ Tap bottom nav or “Change” inside the phone</div>
                <div>→ Speedtest → instant results in Statistics</div>
                <div>→ Full Profile & Subscription flows</div>
                <div>→ Refresh = progress saved (localStorage)</div>
                <div>→ Reset Lab = clean state instantly</div>
              </div>
            </div>
          </div>
        </div>

        {/* Phone Emulator Area — supports internal navigation via BottomNav + buttons */}
        {/* key={resetKey} ensures every screen + tilt state fully resets on Reset Lab */}
        <div className="lg:col-span-9 flex justify-center">
          <PhoneFrame key={resetKey}>
            {labView === 'connected' && <ConnectedScreen onNavigate={navigateInLab} />}
            {labView === 'speedtest' && <SpeedtestScreen onNavigate={navigateInLab} />}
            {labView === 'servers' && <ServerListScreen onNavigate={navigateInLab} />}
            {labView === 'stats' && <StatisticsScreen onNavigate={navigateInLab} />}
            {labView === 'stats-empty' && <StatisticsEmptyScreen onNavigate={navigateInLab} />}
            {labView === 'profile' && <ProfileScreen onNavigate={navigateInLab} />}
            {labView === 'subscription' && <SubscriptionScreen onNavigate={navigateInLab} />}
            {labView === 'edit-profile' && <EditProfileScreen onNavigate={navigateInLab} />}
            {labView === 'change-password' && <ChangePasswordScreen onNavigate={navigateInLab} />}
            {labView === 'logout' && <LogoutConfirmationScreen onNavigate={navigateInLab} />}
            {/* New high-value supporting screens */}
            {labView === 'settings' && <SettingsScreen onNavigate={navigateInLab} />}
            {labView === 'subscription-cancel' && <SubscriptionCancelScreen onNavigate={navigateInLab} />}
            {labView === 'welcome' && <WelcomeScreen onNavigate={navigateInLab} />}
          </PhoneFrame>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AppStateProvider>
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Top Navigation */}
      <nav className="border-b border-white/10 bg-zinc-950/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#7460e1] rounded-lg sm:rounded-xl flex items-center justify-center">
              <span className="font-bold text-lg sm:text-xl tracking-tighter">Y</span>
            </div>
            <div>
              <span className="font-semibold text-lg sm:text-xl tracking-tighter">Yeki</span>
              <span className="hidden sm:inline text-xs ml-1.5 px-1.5 py-0.5 rounded bg-white/10 align-middle">VPN</span>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-7 text-xs sm:text-sm font-medium overflow-x-auto no-scrollbar">
            <Link to="/" className="hover:text-[#7460e1] active:text-[#6652d1] active:scale-[0.985] transition-all duration-150 whitespace-nowrap">Home</Link>
            <Link to="/lab" className="hover:text-[#7460e1] active:text-[#6652d1] active:scale-[0.985] transition-all duration-150 whitespace-nowrap">Prototype Lab</Link>
            <Link to="/design-system" className="hover:text-[#7460e1] active:text-[#6652d1] active:scale-[0.985] transition-all duration-150 whitespace-nowrap">Design System</Link>
            <Link to="/gallery" className="hover:text-[#7460e1] active:text-[#6652d1] active:scale-[0.985] transition-all duration-150 whitespace-nowrap">All Screens</Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a 
              href="https://www.figma.com" 
              target="_blank"
              className="hidden sm:inline px-3.5 py-1.5 text-xs sm:text-sm rounded-full border border-white/20 hover:bg-white/5 active:bg-white/10 active:scale-[0.985] transition-all duration-150"
            >
              Open in Figma
            </a>
            <button className="hidden md:inline px-4 sm:px-5 py-1.5 sm:py-2 bg-[#7460e1] hover:bg-[#6652d1] active:bg-[#5a47b8] rounded-full text-xs sm:text-sm font-medium active:scale-[0.985] transition-all duration-150">
              Download UI Kit
            </button>
          </div>
        </div>
      </nav>

      <Routes>
        {/* Landing / Hero */}
        <Route path="/" element={
          <>
            <Hero />
            <div className="max-w-5xl mx-auto px-8 py-16 sm:py-20 text-center border-t border-white/10">
              <p className="text-3xl sm:text-4xl font-semibold tracking-tighter mb-4">
                50+ 高质量、像素级打磨的 VPN 应用界面
              </p>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                从 Figma 设计系统完整转化为可交互的 Web 原型。点击上方「Prototype Lab」开始体验真实交互流程。
              </p>
            </div>
          </>
        } />

        {/* Interactive Prototype Lab — now powered by shared state + persistence */}
        <Route path="/lab" element={<PrototypeLab />} />

        <Route path="/design-system" element={<DesignSystem />} />
        <Route path="/gallery" element={<ScreenGallery />} />
      </Routes>

      <footer className="border-t border-white/10 py-10 mt-10 bg-zinc-950">
        <div className="max-w-5xl mx-auto px-8 text-center text-xs text-white/50 space-y-2.5">
          <div className="font-medium text-white/70 tracking-[-0.1px] text-sm">Yeki VPN App UI Kit</div>
          <div>
            Sourced from Figma file <span className="font-semibold text-white/70">“Yeki - VPN App UI KIT”</span> (3 pages, 54+ screens)
          </div>
          <div className="text-white/45">
            Built with React 19 + Vite + Tailwind CSS v4 • Multi-agent collaborative process
          </div>
          <div className="pt-1 text-[10px] text-white/35">
            Faithful interactive showcase · All flows &amp; design tokens recreated from production Figma
          </div>
        </div>
      </footer>
    </div>
    </AppStateProvider>
  )
}
