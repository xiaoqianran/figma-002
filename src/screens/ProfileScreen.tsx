import { useAppState } from '../lib/useAppState'
import { BottomNav } from '../components/BottomNav'

interface ProfileScreenProps {
  onNavigate?: (target: string) => void
}

export function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const { userProfile, currentPlan, currentPaymentMethod } = useAppState()

  return (
    <div className="h-full text-white pt-10 px-5 pb-16">
      <div className="text-center mb-8">
        <div className="mx-auto w-20 h-20 rounded-full bg-zinc-700 flex items-center justify-center text-5xl mb-3 border-4 border-white/10">
          {userProfile.avatarUrl || '👤'}
        </div>
        <div className="text-2xl font-semibold">{userProfile.name}</div>
        <div className="text-sm text-white/60">{userProfile.email}</div>
        {userProfile.isPro && (
          <div className="inline-block mt-2 text-xs px-3 py-0.5 bg-gradient-to-r from-[#7460e1] to-violet-600 rounded-full">
            PRO MEMBER
          </div>
        )}
      </div>

      {/* Current Plan Quick Summary */}
      {userProfile.isPro && (
        <div className="mx-1 mb-6 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 flex items-center justify-between text-sm">
          <div>
            <div className="font-medium">{currentPlan === 'pro-yearly' ? 'Pro Yearly' : 'Pro Monthly'}</div>
            <div className="text-xs text-white/50">{currentPaymentMethod}</div>
          </div>
          <button 
            onClick={() => onNavigate?.('subscription')}
            className="text-xs px-3 py-1 rounded-full bg-white/10 active:bg-white/20 transition font-medium"
          >
            Manage →
          </button>
        </div>
      )}

      <div className="space-y-3">
        {[
          { label: 'Edit Profile', icon: '✏️', target: 'edit-profile' as const },
          { label: 'Change Password', icon: '🔒', target: 'change-password' as const },
          { label: 'Settings & Preferences', icon: '⚙️', target: 'settings' as const },
          { label: 'Billing & Plans', icon: '💳', target: 'subscription' as const },
          { label: 'Logout', icon: '🚪', danger: true, target: 'logout' as const }
        ].map((item, idx) => (
          <button 
            key={idx}
            onClick={() => {
              if (item.target === 'edit-profile') {
                onNavigate?.('edit-profile')
              } else if (item.target === 'change-password') {
                onNavigate?.('change-password')
              } else if (item.target === 'settings') {
                onNavigate?.('settings')
              } else if (item.target === 'subscription') {
                onNavigate?.('subscription')
              } else if (item.target === 'logout') {
                onNavigate?.('logout')
              }
            }}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-left transition active:scale-[0.985]
              ${item.danger ? 'bg-red-900/20 text-red-300' : 'bg-white/5 hover:bg-white/10'}`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      <BottomNav 
        active="profile" 
        onChange={(tab) => onNavigate?.(tab)} 
      />
    </div>
  )
}
