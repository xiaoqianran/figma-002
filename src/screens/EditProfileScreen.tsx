import { useState } from 'react'
import { useAppState } from '../lib/useAppState'
import { ArrowLeft, Camera, Check, User } from 'lucide-react'

interface EditProfileScreenProps {
  onNavigate?: (target: string) => void
}

const AVATAR_OPTIONS = ['👤', '🧑‍💼', '👨‍💻', '👩‍🚀', '🦸‍♂️', '👩‍🔬', '🧑‍🎨']

export function EditProfileScreen({ onNavigate }: EditProfileScreenProps) {
  const { userProfile, updateProfile } = useAppState()

  // Local form state (synced from global on mount / external changes)
  const [name, setName] = useState(userProfile.name)
  const [email, setEmail] = useState(userProfile.email)
  const [avatar, setAvatar] = useState(userProfile.avatarUrl || '👤')

  const [step, setStep] = useState<'form' | 'success'>('form')
  const [isUploading, setIsUploading] = useState(false)

  // Note: We intentionally use local state for the form to allow "cancel" semantics.
  // On save we push to global. No auto-sync effect to avoid lint/cascade issues.

  const simulatePhotoUpload = () => {
    setIsUploading(true)
    // Simulate network / processing delay
    setTimeout(() => {
      const currentIdx = AVATAR_OPTIONS.indexOf(avatar)
      const nextIdx = (currentIdx + 1) % AVATAR_OPTIONS.length
      const nextAvatar = AVATAR_OPTIONS[nextIdx]
      setAvatar(nextAvatar)
      setIsUploading(false)
    }, 650)
  }

  const handleAvatarPick = (newAvatar: string) => {
    setAvatar(newAvatar)
  }

  const handleSave = () => {
    if (!name.trim() || !email.includes('@')) return

    // Persist all edits (including simulated avatar photo) to global state
    updateProfile({
      name: name.trim(),
      email: email.trim(),
      avatarUrl: avatar,
    })

    // Transition to beautiful success confirmation state
    setStep('success')
  }

  const handleBackToProfile = () => {
    onNavigate?.('profile')
  }

  const resetToForm = () => {
    setStep('form')
  }

  // ==================== SUCCESS CONFIRMATION STATE ====================
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
            Profile Updated
          </div>
          <div className="w-9" />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
          {/* Success Illustration — consistent with Subscription success pattern + Figma confirmation */}
          <div className="w-24 h-24 rounded-full bg-[#7460e1]/10 flex items-center justify-center mb-8 ring-1 ring-[#7460e1]/30">
            <Check className="w-12 h-12 text-[#7460e1]" />
          </div>

          <div className="text-4xl font-semibold tracking-[-1.5px] mb-3">Profile Updated!</div>
          <div className="text-lg text-white/70 max-w-[300px] mb-8 leading-relaxed">
            Your changes have been saved successfully. Your updated profile information is now reflected across the app.
          </div>

          {/* Summary Card */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-5 w-full max-w-[320px] mb-8 text-left">
            <div className="font-medium text-white mb-3 flex items-center gap-2 text-sm tracking-tight">
              <User className="w-4 h-4" /> Updated details
            </div>
            <div className="space-y-1.5 text-sm text-white/80">
              <div className="flex justify-between"><span className="text-white/50">Display Name</span> <span className="font-medium">{name}</span></div>
              <div className="flex justify-between"><span className="text-white/50">Email</span> <span className="font-medium">{email}</span></div>
              <div className="flex justify-between"><span className="text-white/50">Photo</span> <span className="font-medium">Updated ✓</span></div>
            </div>
          </div>

          <div className="text-[11px] text-white/40 max-w-[260px]">
            You can always return here to make further adjustments.
          </div>
        </div>

        <div className="px-5 pb-8 space-y-3">
          <button
            onClick={handleBackToProfile}
            className="w-full py-4 rounded-2xl bg-[#7460e1] active:bg-[#6652d1] font-semibold text-lg tracking-[-0.2px] transition active:scale-[0.985]"
          >
            See My Profile
          </button>
          <button
            onClick={resetToForm}
            className="w-full py-4 rounded-2xl border border-white/20 text-white/80 font-medium active:bg-white/5 transition active:scale-[0.985]"
          >
            Make More Changes
          </button>
        </div>
      </div>
    )
  }

  // ==================== EDIT FORM ====================
  return (
    <div className="h-full flex flex-col bg-[#18153a] text-white overflow-hidden">
      {/* Top header — Figma-inspired with back nav */}
      <div className="px-5 pt-9 pb-2 flex items-center">
        <button
          onClick={handleBackToProfile}
          className="p-2 -ml-2 text-white/70 active:text-white transition"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1 text-center text-xl font-semibold tracking-tight -ml-7">
          Edit Profile
        </div>
        <div className="w-9" />
      </div>

      <div className="flex-1 overflow-auto px-5 pb-8">
        {/* Avatar + Photo Upload Simulation (Figma aligned + app dark theme) */}
        <div className="flex flex-col items-center mb-8 pt-2">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-zinc-800 border-[6px] border-white/10 flex items-center justify-center text-6xl shadow-inner overflow-hidden">
              {avatar}
            </div>
            <button
              onClick={simulatePhotoUpload}
              disabled={isUploading}
              className="absolute -bottom-1 -right-1 bg-[#7460e1] hover:bg-[#6652d1] rounded-full p-[9px] ring-[5px] ring-[#18153a] active:scale-95 transition disabled:opacity-70"
              title="Upload new photo"
            >
              <Camera className={`w-4 h-4 ${isUploading ? 'animate-pulse' : ''}`} />
            </button>
          </div>

          <div className="text-[10px] tracking-[2px] text-white/50 mt-3 mb-1.5">PHOTO</div>
          <button
            onClick={simulatePhotoUpload}
            disabled={isUploading}
            className="text-xs px-4 py-1 rounded-full bg-white/10 active:bg-white/15 transition text-white/70"
          >
            {isUploading ? 'Uploading...' : 'Upload New Photo (simulated)'}
          </button>

          {/* Quick avatar presets — fun photo sim picker */}
          <div className="flex flex-wrap justify-center gap-1.5 mt-4">
            {AVATAR_OPTIONS.map((a) => (
              <button
                key={a}
                onClick={() => handleAvatarPick(a)}
                className={`text-3xl w-9 h-9 flex items-center justify-center rounded-2xl transition active:scale-90 border
                  ${avatar === a 
                    ? 'border-[#7460e1] bg-[#7460e1]/10 scale-105' 
                    : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
              >
                {a}
              </button>
            ))}
          </div>
          <div className="text-[10px] text-white/40 mt-1.5">or pick a style</div>
        </div>

        {/* Form fields — card style consistent with app (Profile, Subscription, etc) */}
        <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="uppercase tracking-[1.5px] text-[10px] text-white/50 mb-1.5">DISPLAY NAME</div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Chen"
              className="w-full bg-transparent text-[17px] font-medium outline-none placeholder:text-white/30"
            />
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="uppercase tracking-[1.5px] text-[10px] text-white/50 mb-1.5">EMAIL ADDRESS</div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@personal.com"
              className="w-full bg-transparent text-[17px] font-medium outline-none placeholder:text-white/30"
            />
          </div>
        </div>

        {/* Supporting action: Change Password entry point (closes the account loop) */}
        <div className="mt-6 text-center">
          <button
            onClick={() => onNavigate?.('change-password')}
            className="inline-flex items-center gap-1.5 text-sm text-[#7460e1] active:text-violet-400 font-medium"
          >
            Change Password <span aria-hidden>→</span>
          </button>
          <div className="text-[10px] text-white/40 mt-1">Keep your account secure</div>
        </div>
      </div>

      {/* Footer action bar */}
      <div className="px-5 pb-6 pt-2 border-t border-white/10 bg-[#18153a]">
        <button
          onClick={handleSave}
          disabled={!name.trim() || !email.includes('@')}
          className="w-full py-4 rounded-2xl bg-[#7460e1] active:bg-[#6652d1] disabled:bg-[#7460e1]/50 disabled:cursor-not-allowed font-semibold text-lg tracking-[-0.2px] transition active:scale-[0.985]"
        >
          Save Changes
        </button>
        <button
          onClick={handleBackToProfile}
          className="w-full py-3 mt-1 text-sm text-white/60 active:text-white/90 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
