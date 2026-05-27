import { useState } from 'react'
import { useAppState } from '../lib/useAppState'
import { ArrowLeft, XCircle, AlertTriangle, Check } from 'lucide-react'

interface SubscriptionCancelScreenProps {
  onNavigate?: (target: string) => void
}

type CancelStep = 'confirm' | 'success'

export function SubscriptionCancelScreen({ onNavigate }: SubscriptionCancelScreenProps) {
  const { currentPlan, currentPaymentMethod, downgradeToFree } = useAppState()
  const [step, setStep] = useState<CancelStep>('confirm')
  const [isProcessing, setIsProcessing] = useState(false)

  const planLabel = currentPlan === 'pro-yearly' ? 'Pro Yearly' : currentPlan === 'pro-monthly' ? 'Pro Monthly' : 'Free'

  const handleCancel = () => {
    onNavigate?.('subscription')
  }

  const handleConfirmCancel = () => {
    setIsProcessing(true)

    // Simulate secure cancellation processing (realistic delay)
    setTimeout(() => {
      // Downgrade the global demo state — user becomes Free tier immediately
      downgradeToFree()
      setIsProcessing(false)
      setStep('success')
    }, 680)
  }

  const handleBackToSubscription = () => {
    onNavigate?.('subscription')
  }

  const handleGoToFreeExperience = () => {
    // Force free tier experience in demo + go to main connected view
    // We call upgradeToPlan('pro-monthly') then the app state will be adjusted on reset normally.
    // Instead, to simulate downgrade cleanly we simply reset key parts by navigating.
    // For a polished feel: downgrade by setting free state via profile flag and go home.
    // Direct approach: navigate to subscription first so it can reflect, but simplest:
    onNavigate?.('connected')
  }

  // ==================== SUCCESS STATE ====================
  if (step === 'success') {
    return (
      <div className="h-full flex flex-col bg-[#18153a] text-white">
        {/* Consistent top-left exit */}
        <div className="px-5 pt-9 pb-2 flex items-center flex-shrink-0">
          <button
            onClick={handleGoToFreeExperience}
            className="p-2 -ml-2 text-white/70 active:text-white transition"
            aria-label="Continue with Free Plan"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 text-center text-xl font-semibold tracking-tight -ml-7">
            Subscription Cancelled
          </div>
          <div className="w-9" />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
          <div className="w-24 h-24 rounded-full bg-amber-500/10 flex items-center justify-center mb-8 ring-1 ring-amber-500/30">
            <Check className="w-12 h-12 text-amber-400" />
          </div>

          <div className="text-4xl font-semibold tracking-[-1.5px] mb-3">Plan Cancelled</div>
          <div className="text-lg text-white/70 max-w-[310px] mb-7 leading-relaxed">
            Your Pro subscription has been cancelled. You are now on the Free plan.
          </div>

          {/* Summary card — distinct from payment/logout */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-5 w-full max-w-[320px] mb-8 text-left">
            <div className="text-xs tracking-[1.5px] text-white/50 mb-3">WHAT CHANGED</div>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-white/70">Previous plan</span>
                <span className="font-medium line-through text-white/40">{planLabel}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Current plan</span>
                <span className="font-semibold text-amber-300">Free</span>
              </div>
              <div className="pt-1 border-t border-white/10 text-[12px] text-white/55">
                Full-speed servers, unlimited data, and Pro-only features are now disabled. 
                You can re-subscribe anytime from the Pro screen.
              </div>
            </div>
          </div>

          <div className="text-[11px] text-white/40 max-w-[270px]">
            Thank you for trying Yeki Pro. Your data and connection history remain safe.
          </div>
        </div>

        <div className="px-5 pb-8 space-y-3">
          <button
            onClick={handleGoToFreeExperience}
            className="w-full py-4 rounded-2xl bg-[#7460e1] active:bg-[#6652d1] font-semibold text-lg tracking-[-0.2px] transition active:scale-[0.985]"
          >
            Continue with Free Plan
          </button>
          <button
            onClick={handleBackToSubscription}
            className="w-full py-4 rounded-2xl border border-white/20 text-white/80 font-medium active:bg-white/5 transition active:scale-[0.985]"
          >
            View Plans Again
          </button>
        </div>
      </div>
    )
  }

  // ==================== CONFIRMATION ====================
  return (
    <div className="h-full flex flex-col bg-[#18153a] text-white">
      {/* Header */}
      <div className="px-5 pt-9 pb-2 flex items-center flex-shrink-0">
        <button
          onClick={handleCancel}
          className="p-2 -ml-2 text-white/70 active:text-white transition"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1 text-center text-xl font-semibold tracking-tight -ml-7">
          Cancel Subscription
        </div>
        <div className="w-9" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-5">
        {/* Warning icon — distinct visual language */}
        <div className="w-20 h-20 rounded-3xl bg-amber-500/10 flex items-center justify-center mb-7 ring-1 ring-amber-500/25">
          <AlertTriangle className="w-10 h-10 text-amber-400" />
        </div>

        <div className="text-center mb-6 max-w-[300px]">
          <div className="text-3xl font-semibold tracking-[-1.2px] mb-3">Cancel your {planLabel}?</div>
          <p className="text-white/65 text-[15px] leading-relaxed">
            You will lose access to Pro-only servers, higher speeds, and priority support immediately.
          </p>
        </div>

        {/* Plan summary card */}
        <div className="w-full max-w-[320px] bg-white/5 border border-white/10 rounded-2xl p-5 mb-7 text-sm">
          <div className="flex justify-between mb-3">
            <div>
              <div className="font-medium">{planLabel}</div>
              <div className="text-xs text-white/50">{currentPaymentMethod}</div>
            </div>
            <div className="text-right font-semibold text-amber-300">Active</div>
          </div>
          <div className="pt-3 border-t border-white/10 text-[12px] text-white/60 flex items-start gap-2">
            <AlertTriangle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
            <span>No partial refunds. You keep access until the end of the current billing period.</span>
          </div>
        </div>

        {/* Important note — matches Figma tone */}
        <div className="max-w-[310px] text-center text-xs text-white/50 leading-relaxed px-1">
          Are you sure? You can resubscribe at any time and pick up right where you left off.
        </div>
      </div>

      {/* Actions */}
      <div className="px-5 pb-8 space-y-3 flex-shrink-0">
        <button
          onClick={handleConfirmCancel}
          disabled={isProcessing}
          className="w-full py-4 rounded-2xl bg-red-600 hover:bg-red-700 active:bg-red-800 font-semibold text-lg tracking-[-0.2px] transition active:scale-[0.985] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>Processing cancellation…</>
          ) : (
            <>
              <XCircle className="w-5 h-5" /> Confirm Cancellation
            </>
          )}
        </button>

        <button
          onClick={handleCancel}
          disabled={isProcessing}
          className="w-full py-4 rounded-2xl border border-white/20 text-white/90 font-medium active:bg-white/5 transition active:scale-[0.985] disabled:opacity-60"
        >
          Keep My {planLabel}
        </button>

        <div className="text-center text-[10px] text-white/35 pt-1 tracking-wider">
          You can always upgrade again from the Pro screen
        </div>
      </div>
    </div>
  )
}
