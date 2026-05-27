import { useState } from 'react'
import { ArrowLeft, Check, Eye, EyeOff, Lock } from 'lucide-react'

interface ChangePasswordScreenProps {
  onNavigate?: (target: string) => void
}

type PwStep = 'form' | 'success'

export function ChangePasswordScreen({ onNavigate }: ChangePasswordScreenProps) {
  const [currentPw, setCurrentPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')

  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const [step, setStep] = useState<PwStep>('form')
  const [error, setError] = useState('')

  const isFormValid = currentPw.length >= 4 && newPw.length >= 8 && confirmPw === newPw

  const handleSubmit = () => {
    setError('')

    if (newPw.length < 8) {
      setError('New password must be at least 8 characters.')
      return
    }
    if (newPw !== confirmPw) {
      setError('New passwords do not match.')
      return
    }
    if (currentPw === newPw) {
      setError('New password must be different from current password.')
      return
    }

    // Simulate API call / processing
    setTimeout(() => {
      // Success! (no global password state to persist — demo only)
      setStep('success')
    }, 420)
  }

  const handleBackToProfile = () => {
    onNavigate?.('profile')
  }

  const goToEditProfile = () => {
    onNavigate?.('edit-profile')
  }

  const resetForm = () => {
    setCurrentPw('')
    setNewPw('')
    setConfirmPw('')
    setError('')
    setStep('form')
    setShowCurrent(false)
    setShowNew(false)
    setShowConfirm(false)
  }

  // ==================== SUCCESS STATE (confirmation) ====================
  if (step === 'success') {
    return (
      <div className="h-full flex flex-col bg-[#18153a] text-white">
        {/* Consistent top-left back for easy exit from success state */}
        <div className="px-5 pt-9 pb-2 flex items-center flex-shrink-0">
          <button
            onClick={handleBackToProfile}
            className="p-2 -ml-2 text-white/70 active:text-white transition"
            aria-label="Go back to Profile"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 text-center text-xl font-semibold tracking-tight -ml-7">
            Password Changed
          </div>
          <div className="w-9" />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
          <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center mb-8 ring-1 ring-emerald-500/30">
            <Check className="w-12 h-12 text-emerald-400" />
          </div>

          <div className="text-4xl font-semibold tracking-[-1.5px] mb-3">Password Changed!</div>
          <div className="text-lg text-white/70 max-w-[300px] mb-8 leading-relaxed">
            Your password has been successfully updated. You are now using your new secure password.
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-5 w-full max-w-[320px] mb-8 text-left">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-[#7460e1]/20 flex items-center justify-center">
                <Lock className="w-5 h-5 text-[#7460e1]" />
              </div>
              <div>
                <div className="font-semibold text-sm">Security Updated</div>
                <div className="text-xs text-white/50">All future logins will require the new password.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 pb-8 space-y-3">
          <button
            onClick={handleBackToProfile}
            className="w-full py-4 rounded-2xl bg-[#7460e1] active:bg-[#6652d1] font-semibold text-lg tracking-[-0.2px] transition active:scale-[0.985]"
          >
            Back to Profile
          </button>
          <button
            onClick={goToEditProfile}
            className="w-full py-4 rounded-2xl border border-white/20 text-white/80 font-medium active:bg-white/5 transition active:scale-[0.985]"
          >
            Edit Profile
          </button>
          <button
            onClick={resetForm}
            className="w-full py-3 text-sm text-white/50 active:text-white/70 transition"
          >
            Change Password Again
          </button>
        </div>
      </div>
    )
  }

  // ==================== PASSWORD FORM ====================
  return (
    <div className="h-full flex flex-col bg-[#18153a] text-white overflow-hidden">
      {/* Header with back (Figma Change Password layout) */}
      <div className="px-5 pt-9 pb-2 flex items-center">
        <button
          onClick={handleBackToProfile}
          className="p-2 -ml-2 text-white/70 active:text-white transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1 text-center text-xl font-semibold tracking-tight -ml-7">
          Change Password
        </div>
        <div className="w-9" />
      </div>

      <div className="flex-1 overflow-auto px-5 pt-4 pb-6">
        <div className="text-sm text-white/70 max-w-[310px] mb-8">
          Change your password and keep your account secure. Your new password must be at least 8 characters long.
        </div>

        {/* Form fields with eye toggles — styled like Figma forms + app cards */}
        <div className="space-y-4">
          {/* Current Password */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="uppercase tracking-[1.5px] text-[10px] text-white/50 mb-1.5 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5" /> CURRENT PASSWORD
            </div>
            <div className="flex items-center gap-3">
              <input
                type={showCurrent ? 'text' : 'password'}
                value={currentPw}
                onChange={(e) => setCurrentPw(e.target.value)}
                placeholder="Enter current password"
                className="flex-1 bg-transparent text-[17px] font-medium outline-none placeholder:text-white/30"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="text-white/50 active:text-white p-1"
              >
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="uppercase tracking-[1.5px] text-[10px] text-white/50 mb-1.5 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5" /> NEW PASSWORD
            </div>
            <div className="flex items-center gap-3">
              <input
                type={showNew ? 'text' : 'password'}
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                placeholder="Create new password (min 8 chars)"
                className="flex-1 bg-transparent text-[17px] font-medium outline-none placeholder:text-white/30"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="text-white/50 active:text-white p-1"
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="uppercase tracking-[1.5px] text-[10px] text-white/50 mb-1.5 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5" /> CONFIRM NEW PASSWORD
            </div>
            <div className="flex items-center gap-3">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPw}
                onChange={(e) => setConfirmPw(e.target.value)}
                placeholder="Re-enter new password"
                className="flex-1 bg-transparent text-[17px] font-medium outline-none placeholder:text-white/30"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="text-white/50 active:text-white p-1"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 px-1 text-sm text-red-400">{error}</div>
        )}

        {/* Info note */}
        <div className="mt-6 px-1 text-[11px] text-white/40 leading-snug">
          After changing your password you will remain logged in on this device. Use the new password on other devices.
        </div>
      </div>

      {/* Action bar */}
      <div className="px-5 pb-6 pt-2 border-t border-white/10 bg-[#18153a]">
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className="w-full py-4 rounded-2xl bg-[#7460e1] active:bg-[#6652d1] disabled:bg-[#7460e1]/50 disabled:cursor-not-allowed font-semibold text-lg tracking-[-0.2px] transition active:scale-[0.985]"
        >
          Update Password
        </button>
        <button
          onClick={handleBackToProfile}
          className="w-full py-3 mt-1 text-sm text-white/60 active:text-white/90 transition"
        >
          Cancel
        </button>

        {/* Link back to edit profile as supporting flow */}
        <div className="text-center mt-4">
          <button onClick={goToEditProfile} className="text-xs text-[#7460e1]/80 active:text-[#7460e1]">
            ← Back to Edit Profile
          </button>
        </div>
      </div>
    </div>
  )
}
