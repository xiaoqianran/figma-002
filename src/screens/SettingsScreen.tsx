import { useState } from 'react'
import { ArrowLeft, Shield, Bell, Zap, Globe, Info } from 'lucide-react'

interface SettingsScreenProps {
  onNavigate?: (target: string) => void
}

interface ToggleProps {
  checked: boolean
  onChange: (val: boolean) => void
  disabled?: boolean
  label?: string
}

function Toggle({ checked, onChange, disabled = false }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`relative inline-flex h-7 w-12 flex-shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7460e1]/50
        ${checked ? 'bg-[#7460e1]' : 'bg-white/20'} 
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'active:scale-[0.985]'}`}
      aria-pressed={checked}
      role="switch"
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-200
          ${checked ? 'translate-x-6' : 'translate-x-1'}`}
      />
    </button>
  )
}

interface SettingRowProps {
  icon?: React.ReactNode
  label: string
  description?: string
  checked: boolean
  onChange: (val: boolean) => void
  disabled?: boolean
  danger?: boolean
}

function SettingRow({ icon, label, description, checked, onChange, disabled, danger }: SettingRowProps) {
  const [justSaved, setJustSaved] = useState(false)

  const handleToggle = (val: boolean) => {
    onChange(val)
    if (!disabled) {
      setJustSaved(true)
      setTimeout(() => setJustSaved(false), 1100)
    }
  }

  return (
    <div className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition ${danger ? 'bg-red-900/10' : 'bg-white/5 hover:bg-white/10'}`}>
      {icon && (
        <div className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-lg ${danger ? 'bg-red-500/10 text-red-400' : 'bg-white/10 text-white/80'}`}>
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className={`font-medium text-[15px] tracking-[-0.1px] ${danger ? 'text-red-300' : 'text-white'}`}>{label}</div>
        {description && (
          <div className="text-[12px] text-white/50 leading-snug mt-0.5 pr-2">{description}</div>
        )}
      </div>
      <div className="flex items-center gap-2">
        {justSaved && (
          <span className="text-[10px] uppercase tracking-[1px] text-emerald-400/80 mr-1">Saved</span>
        )}
        <Toggle checked={checked} onChange={handleToggle} disabled={disabled} />
      </div>
    </div>
  )
}

export function SettingsScreen({ onNavigate }: SettingsScreenProps) {
  // Local interactive state — realistic defaults for a Pro user. Changes are "applied" instantly with feedback.
  const [autoConnect, setAutoConnect] = useState(true)
  const [reconnect, setReconnect] = useState(true)
  const [killSwitch, setKillSwitch] = useState(true)
  const [blockAds, setBlockAds] = useState(false)
  const [dnsLeak, setDnsLeak] = useState(true)
  const [pushNotif, setPushNotif] = useState(true)
  const [connAlerts, setConnAlerts] = useState(true)
  const [speedReminders, setSpeedReminders] = useState(false)
  const [dataSaver, setDataSaver] = useState(false)

  const handleBack = () => {
    onNavigate?.('profile')
  }

  return (
    <div className="h-full flex flex-col bg-[#18153a] text-white overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-9 pb-3 flex items-center flex-shrink-0 border-b border-white/10">
        <button
          onClick={handleBack}
          className="p-2 -ml-2 text-white/70 active:text-white transition"
          aria-label="Go back to Profile"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1 text-center text-xl font-semibold tracking-tight -ml-7">
          Settings
        </div>
        <div className="w-9" />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8 text-sm">
        {/* CONNECTION */}
        <div>
          <div className="px-1 flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-[#7460e1]" />
            <div className="uppercase tracking-[1.5px] text-[10px] font-medium text-white/50">Connection</div>
          </div>
          <div className="space-y-2">
            <SettingRow
              icon={<Zap className="w-4 h-4" />}
              label="Auto-connect on launch"
              description="Automatically connect to the last used server when opening the app"
              checked={autoConnect}
              onChange={setAutoConnect}
            />
            <SettingRow
              icon={<Globe className="w-4 h-4" />}
              label="Auto-reconnect on network change"
              description="Stay protected when switching Wi-Fi or mobile data"
              checked={reconnect}
              onChange={setReconnect}
            />
          </div>
        </div>

        {/* PRIVACY & SECURITY — most important for VPN */}
        <div>
          <div className="px-1 flex items-center gap-2 mb-3">
            <Shield className="w-4 h-4 text-[#7460e1]" />
            <div className="uppercase tracking-[1.5px] text-[10px] font-medium text-white/50">Privacy &amp; Security</div>
          </div>
          <div className="space-y-2">
            <SettingRow
              icon={<Shield className="w-4 h-4" />}
              label="Kill Switch"
              description="Block all internet if the VPN connection drops unexpectedly"
              checked={killSwitch}
              onChange={setKillSwitch}
              danger={!killSwitch}
            />
            <SettingRow
              icon="🛡️"
              label="Block ads & trackers"
              description="Filter malicious domains and reduce ads at the DNS level"
              checked={blockAds}
              onChange={setBlockAds}
            />
            <SettingRow
              icon="🔒"
              label="DNS Leak Protection"
              description="Force all DNS queries through the secure VPN tunnel"
              checked={dnsLeak}
              onChange={setDnsLeak}
            />
          </div>
          <div className="px-1 mt-2 text-[10px] text-white/40 leading-tight">
            These features are always available on Pro plans.
          </div>
        </div>

        {/* NOTIFICATIONS */}
        <div>
          <div className="px-1 flex items-center gap-2 mb-3">
            <Bell className="w-4 h-4 text-[#7460e1]" />
            <div className="uppercase tracking-[1.5px] text-[10px] font-medium text-white/50">Notifications</div>
          </div>
          <div className="space-y-2">
            <SettingRow
              icon={<Bell className="w-4 h-4" />}
              label="Push notifications"
              description="Receive important updates and connection events"
              checked={pushNotif}
              onChange={setPushNotif}
            />
            <SettingRow
              icon="📶"
              label="Connection status alerts"
              description="Notify when you connect, disconnect, or server changes"
              checked={connAlerts}
              onChange={setConnAlerts}
            />
            <SettingRow
              icon="⏱️"
              label="Weekly speed reports"
              description="Get a summary of your average speeds and usage"
              checked={speedReminders}
              onChange={setSpeedReminders}
            />
          </div>
        </div>

        {/* ADVANCED / DATA */}
        <div>
          <div className="px-1 flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-[#7460e1]" />
            <div className="uppercase tracking-[1.5px] text-[10px] font-medium text-white/50">Advanced</div>
          </div>
          <div className="space-y-2">
            <SettingRow
              icon="📉"
              label="Data Saver mode"
              description="Limit background activity and compress traffic where possible"
              checked={dataSaver}
              onChange={setDataSaver}
            />
            <div 
              onClick={() => onNavigate?.('subscription')}
              className="flex items-center justify-between bg-white/5 hover:bg-white/10 active:bg-white/15 transition px-5 py-4 rounded-2xl cursor-pointer"
            >
              <div>
                <div className="font-medium">Protocol &amp; Server preferences</div>
                <div className="text-xs text-white/50 mt-0.5">WireGuard • Auto best server • Change in Pro</div>
              </div>
              <div className="text-[#7460e1] text-sm font-medium">Manage →</div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-1 pt-2 pb-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-[11px] text-white/50 leading-relaxed">
            Settings are saved instantly and sync to your other devices when using a Pro account. 
            Some advanced options require an active subscription.
          </div>
          <div className="text-center mt-6 text-[10px] text-white/30 tracking-widest">
            Yeki VPN v2.4.1 • All changes applied locally in this demo
          </div>
        </div>
      </div>
    </div>
  )
}
