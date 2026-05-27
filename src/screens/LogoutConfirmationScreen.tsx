import { useState } from 'react'
import { useAppState } from '../lib/useAppState'
import { ArrowLeft, LogOut, Check } from 'lucide-react'

interface LogoutConfirmationScreenProps {
  onNavigate?: (target: string) => void
}

type LogoutStep = 'confirm' | 'success'

export function LogoutConfirmationScreen({ onNavigate }: LogoutConfirmationScreenProps) {
  const { userProfile, resetDemoState } = useAppState()
  const [step, setStep] = useState<LogoutStep>('confirm')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleCancel = () => {
    onNavigate?.('profile')
  }

  const handleConfirmLogout = () => {
    setIsProcessing(true)

    // Simulate network / secure logout processing
    setTimeout(() => {
      setIsProcessing(false)
      setStep('success')
    }, 520)
  }

  const handleBackToProfile = () => {
    onNavigate?.('profile')
  }

  const handleSignInAgain = () => {
    // Reset demo to clean state and return to main connected view (as if freshly logged in)
    resetDemoState()
    onNavigate?.('connected')
  }

  // ==================== SUCCESS STATE ====================
  if (step === 'success') {
    return (
      <div className="h-full flex flex-col bg-[#18153a] text-white">
        {/* Consistent top-left exit from success */}
        <div className="px-5 pt-9 pb-2 flex items-center flex-shrink-0">
          <button
            onClick={handleSignInAgain}
            className="p-2 -ml-2 text-white/70 active:text-white transition"
            aria-label="Sign in again"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 text-center text-xl font-semibold tracking-tight -ml-7">
            Signed Out
          </div>
          <div className="w-9" />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
          {/* Beautiful success illustration matching Edit Profile / Subscription patterns */}
          <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center mb-8 ring-1 ring-emerald-500/30">
            <Check className="w-12 h-12 text-emerald-400" />
          </div>

          <div className="text-4xl font-semibold tracking-[-1.5px] mb-3">Signed Out</div>
          <div className="text-lg text-white/70 max-w-[300px] mb-6 leading-relaxed">
            You have been successfully logged out of Yeki VPN.
          </div>

          {/* User summary card */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-5 w-full max-w-[320px] mb-8 text-left">
            <div className="text-xs tracking-[1.5px] text-white/50 mb-3">SESSION ENDED</div>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-zinc-700 flex items-center justify-center text-3xl border-2 border-white/10 flex-shrink-0">
                {userProfile.avatarUrl || '👤'}
              </div>
              <div>
                <div className="font-semibold text-lg tracking-tight">{userProfile.name}</div>
                <div className="text-sm text-white/60">{userProfile.email}</div>
                <div className="text-[11px] text-emerald-400/80 mt-1">All sessions terminated</div>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-white/40 max-w-[260px]">
            Your data is safe. Sign back in anytime to resume your secure connection.
          </div>
        </div>

        <div className="px-5 pb-8 space-y-3">
          <button
            onClick={handleSignInAgain}
            className="w-full py-4 rounded-2xl bg-[#7460e1] active:bg-[#6652d1] font-semibold text-lg tracking-[-0.2px] transition active:scale-[0.985]"
          >
            Sign In Again
          </button>
          <button
            onClick={handleBackToProfile}
            className="w-full py-4 rounded-2xl border border-white/20 text-white/80 font-medium active:bg-white/5 transition active:scale-[0.985]"
          >
            Return to Profile
          </button>
        </div>
      </div>
    )
  }

  // ==================== CONFIRMATION DIALOG ====================
  return (
    <div className="h-full flex flex-col bg-[#18153a] text-white">
      {/* Header with back */}
      <div className="px-5 pt-9 pb-2 flex items-center">
        <button
          onClick={handleCancel}
          className="p-2 -ml-2 text-white/70 active:text-white transition"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1 text-center text-xl font-semibold tracking-tight -ml-7">
          Account
        </div>
        <div className="w-9" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Icon */}
        <div className="w-20 h-20 rounded-3xl bg-red-500/10 flex items-center justify-center mb-8 ring-1 ring-red-500/20">
          <LogOut className="w-10 h-10 text-red-400" />
        </div>

        <div className="text-center mb-8">
          <div className="text-3xl font-semibold tracking-[-1px] mb-3">Log out of Yeki?</div>
          <p className="text-white/65 text-[15px] max-w-[280px] leading-relaxed">
            You will be signed out on this device. Your current VPN connection will be terminated.
          </p>
        </div>

        {/* User preview */}
        <div className="w-full max-w-[320px] bg-white/5 border border-white/10 rounded-2xl p-4 mb-9">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center text-3xl border border-white/10">
              {userProfile.avatarUrl || '👤'}
            </div>
            <div className="min-w-0">
              <div className="font-medium">{userProfile.name}</div>
              <div className="text-xs text-white/50 truncate">{userProfile.email}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons — prominent confirm (danger) + cancel */}
      <div className="px-5 pb-8 space-y-3">
        <button
          onClick={handleConfirmLogout}
          disabled={isProcessing}
          className="w-full py-4 rounded-2xl bg-red-600 hover:bg-red-700 active:bg-red-800 font-semibold text-lg tracking-[-0.2px] transition active:scale-[0.985] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>Signing out…</>
          ) : (
            <>
              <LogOut className="w-5 h-5" /> Log Out
            </>
          )}
        </button>

        <button
          onClick={handleCancel}
          disabled={isProcessing}
          className="w-full py-4 rounded-2xl border border-white/20 text-white/90 font-medium active:bg-white/5 transition active:scale-[0.985] disabled:opacity-60"
        >
          Cancel
        </button>

        <div className="text-center text-[10px] text-white/40 pt-1 tracking-wider">
          You can always sign back in from the login screen
        </div>
      </div>
    </div>
  )
}
