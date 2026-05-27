import { useState } from 'react'
import { useAppState, type SubscriptionPlan } from '../lib/useAppState'
import { BottomNav } from '../components/BottomNav'
import { 
  ArrowLeft, CreditCard, Check, X, Crown, Shield, 
  ChevronRight, Star 
} from 'lucide-react'

interface SubscriptionScreenProps {
  onNavigate?: (target: string) => void
}

type FlowStep = 
  | 'overview' 
  | 'choose-method' 
  | 'confirm' 
  | 'processing' 
  | 'success' 
  | 'failure'

interface PaymentMethod {
  id: string
  label: string
  detail: string
  icon: React.ReactNode
}

const PAYMENT_METHODS: PaymentMethod[] = [
  { 
    id: 'visa', 
    label: 'Visa', 
    detail: '•••• 4242', 
    icon: <CreditCard className="w-5 h-5" /> 
  },
  { 
    id: 'mastercard', 
    label: 'Mastercard', 
    detail: '•••• 1881', 
    icon: <CreditCard className="w-5 h-5" /> 
  },
  { 
    id: 'paypal', 
    label: 'PayPal', 
    detail: 'alex.chen@personal.com', 
    icon: <span className="text-lg font-bold">P</span> 
  },
  { 
    id: 'apple', 
    label: 'Apple Pay', 
    detail: '•••• 4242', 
    icon: <span className="text-lg"></span> 
  },
]

const PLAN_DETAILS = {
  'pro-monthly': {
    name: 'Pro Monthly',
    price: 9.99,
    period: 'month',
    savings: null,
    features: ['Unlimited servers', 'Priority speeds', 'No ads', '24/7 support'],
  },
  'pro-yearly': {
    name: 'Pro Yearly',
    price: 99,
    period: 'year',
    savings: 'Save 17%',
    features: ['Everything in Monthly', 'Best value', 'Priority support', 'Early access features'],
  },
}

export function SubscriptionScreen({ onNavigate }: SubscriptionScreenProps) {
  const { 
    userProfile, 
    currentPlan, 
    currentPaymentMethod, 
    upgradeToPlan, 
    setPaymentMethod: updateGlobalPaymentMethod 
  } = useAppState()

  const [step, setStep] = useState<FlowStep>('overview')
  const [selectedPlan, setSelectedPlan] = useState<'pro-monthly' | 'pro-yearly'>(
    currentPlan === 'pro-yearly' ? 'pro-yearly' : 'pro-monthly'
  )
  const [selectedMethod, setSelectedMethod] = useState(currentPaymentMethod)
  const [processingMessage, setProcessingMessage] = useState('')

  const isPro = userProfile.isPro
  const currentPlanDetails = PLAN_DETAILS[currentPlan as keyof typeof PLAN_DETAILS] || null

  const goBack = () => {
    if (step === 'overview') {
      onNavigate?.('profile')
    } else if (step === 'choose-method' || step === 'confirm') {
      setStep('overview')
    } else if (step === 'failure') {
      setStep('choose-method')
    } else {
      setStep('overview')
    }
  }

  const handleSelectPlan = (plan: 'pro-monthly' | 'pro-yearly') => {
    setSelectedPlan(plan)
    if (plan === currentPlan) {
      // Already on it — just show overview or allow payment management
      setStep('choose-method')
    } else {
      setStep('choose-method')
    }
  }

  const handleChooseMethodContinue = () => {
    setStep('confirm')
  }

  const handleConfirmPayment = (simulateFailure = false) => {
    setProcessingMessage(simulateFailure ? 'Processing payment...' : 'Authorizing payment...')
    setStep('processing')

    // Simulate network delay
    setTimeout(() => {
      if (simulateFailure) {
        setStep('failure')
      } else {
        // Success: persist to global state
        upgradeToPlan(selectedPlan)
        updateGlobalPaymentMethod(selectedMethod)
        
        setStep('success')
      }
      setProcessingMessage('')
    }, 850)
  }

  const handleSuccessDone = () => {
    onNavigate?.('profile')
  }

  const resetToOverview = () => {
    setStep('overview')
    // Refresh selected from latest global
    setSelectedPlan(currentPlan === 'pro-yearly' ? 'pro-yearly' : 'pro-monthly')
    setSelectedMethod(currentPaymentMethod)
  }

  const formatPrice = (price: number, period: string) => {
    if (period === 'year') return `$${price}`
    return `$${price.toFixed(2)}`
  }

  const getPlanDisplayName = (plan: SubscriptionPlan) => {
    if (plan === 'pro-monthly') return 'Pro Monthly'
    if (plan === 'pro-yearly') return 'Pro Yearly'
    return 'Free'
  }

  // Render different steps
  const renderContent = () => {
    // ========== PROCESSING ==========
    if (step === 'processing') {
      return (
        <div className="flex flex-col items-center justify-center h-full px-8 text-center">
          <div className="w-16 h-16 rounded-full border-4 border-[#7460e1]/30 border-t-[#7460e1] animate-spin mb-8" />
          <div className="text-2xl font-semibold tracking-tight mb-2">Processing</div>
          <p className="text-white/60 max-w-[260px]">{processingMessage || 'Please wait while we confirm your payment...'}</p>
        </div>
      )
    }

    // ========== SUCCESS ==========
    if (step === 'success') {
      const planName = PLAN_DETAILS[selectedPlan].name
      return (
        <div className="h-full flex flex-col bg-[#18153a] text-white">
          {/* Reliable top-left exit back to Profile */}
          <div className="px-5 pt-9 pb-2 flex items-center flex-shrink-0">
            <button
              onClick={handleSuccessDone}
              className="p-2 -ml-2 text-white/70 active:text-white transition"
              aria-label="Go back to Profile"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1 text-center text-xl font-semibold tracking-tight -ml-7">
              Subscription
            </div>
            <div className="w-9" />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-2">
            <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center mb-8 ring-1 ring-emerald-500/30">
              <Check className="w-12 h-12 text-emerald-400" />
            </div>
            
            <div className="text-4xl font-semibold tracking-[-1.5px] mb-3">Payment Successful</div>
            <div className="text-lg text-white/70 max-w-[280px] mb-8">
              Welcome to {planName}! Your subscription is now active.
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-5 w-full max-w-[320px] mb-8 text-left">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-2xl bg-[#7460e1] flex items-center justify-center">
                  <Crown className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold">{planName}</div>
                  <div className="text-xs text-white/50">Active now • Renews automatically</div>
                </div>
              </div>
              <div className="text-sm text-white/60">
                You now have full access to premium servers, priority speeds, and exclusive features.
              </div>
            </div>
          </div>

          <div className="px-5 pb-6 space-y-3">
            <button 
              onClick={handleSuccessDone}
              className="w-full py-4 rounded-2xl bg-[#7460e1] active:bg-[#6652d1] font-semibold text-lg tracking-[-0.2px] transition active:scale-[0.985]"
            >
              Back to Profile
            </button>
            <button 
              onClick={resetToOverview}
              className="w-full py-4 rounded-2xl border border-white/20 text-white/80 font-medium active:bg-white/5 transition"
            >
              View My Subscription
            </button>
          </div>
        </div>
      )
    }

    // ========== FAILURE ==========
    if (step === 'failure') {
      return (
        <div className="h-full flex flex-col bg-[#18153a] text-white">
          {/* Reliable top-left exit */}
          <div className="px-5 pt-9 pb-2 flex items-center flex-shrink-0">
            <button
              onClick={() => setStep('overview')}
              className="p-2 -ml-2 text-white/70 active:text-white transition"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1 text-center text-xl font-semibold tracking-tight -ml-7">
              Payment
            </div>
            <div className="w-9" />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-2">
            <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center mb-8 ring-1 ring-red-500/30">
              <X className="w-12 h-12 text-red-400" />
            </div>
            
            <div className="text-4xl font-semibold tracking-[-1.5px] mb-3">Payment Failed</div>
            <p className="text-white/70 max-w-[280px] mb-8">
              Your card was declined. This can happen due to insufficient funds or bank restrictions.
            </p>

            <div className="bg-red-950/40 border border-red-900/60 rounded-3xl p-4 text-sm w-full max-w-[300px]">
              <div className="font-medium text-red-300 mb-1">Try these steps:</div>
              <ul className="text-white/70 text-left list-disc pl-4 space-y-1 text-sm">
                <li>Use a different payment method</li>
                <li>Contact your bank</li>
                <li>Try again in a few minutes</li>
              </ul>
            </div>
          </div>

          <div className="px-5 pb-6 space-y-3">
            <button 
              onClick={() => setStep('choose-method')}
              className="w-full py-4 rounded-2xl bg-[#7460e1] active:bg-[#6652d1] font-semibold text-lg transition active:scale-[0.985]"
            >
              Choose Different Method
            </button>
            <button 
              onClick={() => setStep('overview')}
              className="w-full py-4 rounded-2xl border border-white/20 font-medium text-white/80 active:bg-white/5 transition"
            >
              Back to Plans
            </button>
          </div>
        </div>
      )
    }

    // ========== CONFIRM ==========
    if (step === 'confirm') {
      const plan = PLAN_DETAILS[selectedPlan]
      const priceText = selectedPlan === 'pro-yearly' 
        ? '$99 billed yearly' 
        : '$9.99 billed monthly'

      return (
        <div className="h-full flex flex-col pt-9 px-5 text-white">
          {/* Header */}
          <div className="flex items-center mb-6">
            <button onClick={() => setStep('choose-method')} className="p-2 -ml-2 text-white/70 active:text-white">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1 text-center text-xl font-semibold tracking-tight -ml-7">Confirm Payment</div>
          </div>

          {/* Summary Card */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-6">
            <div className="uppercase tracking-[2px] text-xs text-white/50 mb-4">ORDER SUMMARY</div>
            
            <div className="flex justify-between items-start mb-5 pb-5 border-b border-white/10">
              <div>
                <div className="font-semibold text-xl">{plan.name}</div>
                <div className="text-sm text-white/60 mt-0.5">Premium VPN access</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-2xl font-semibold tabular-nums tracking-tight">
                  {formatPrice(plan.price, plan.period)}
                </div>
                <div className="text-xs text-white/50">/ {plan.period}</div>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-white/70">Selected plan</span>
                <span className="font-medium">{plan.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Billing</span>
                <span>{priceText}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-white/10">
                <span className="font-semibold">Total today</span>
                <span className="font-semibold font-mono tabular-nums">
                  {selectedPlan === 'pro-yearly' ? '$99.00' : '$9.99'}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Method Summary */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-4 mb-8 flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-[#7460e1]">
              <CreditCard className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="font-medium">{selectedMethod}</div>
              <div className="text-xs text-white/50">Charged securely</div>
            </div>
            <div className="text-xs px-3 py-1 bg-white/5 rounded-full text-white/60">SECURE</div>
          </div>

          <div className="mt-auto pb-6 space-y-3">
            <button 
              onClick={() => handleConfirmPayment(false)}
              className="w-full py-4 bg-[#7460e1] hover:bg-[#6652d1] active:scale-[0.985] rounded-2xl font-semibold text-lg tracking-[-0.2px] transition shadow-lg shadow-[#7460e1]/30"
            >
              Confirm &amp; Pay
            </button>
            
            <button 
              onClick={() => handleConfirmPayment(true)}
              className="w-full py-3.5 text-sm text-white/50 active:text-white/70 transition"
            >
              Simulate payment failure (demo)
            </button>
          </div>
        </div>
      )
    }

    // ========== CHOOSE PAYMENT METHOD ==========
    if (step === 'choose-method') {
      const plan = PLAN_DETAILS[selectedPlan]

      return (
        <div className="h-full flex flex-col pt-9 px-5 text-white">
          <div className="flex items-center mb-6">
            <button onClick={goBack} className="p-2 -ml-2 text-white/70 active:text-white">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1 text-center text-xl font-semibold tracking-tight -ml-7">Choose Payment</div>
          </div>

          {/* Selected Plan Banner */}
          <div className="mb-5 flex items-center gap-3 bg-[#7460e1]/10 border border-[#7460e1]/30 rounded-2xl px-4 py-3">
            <Crown className="w-5 h-5 text-[#a8a1d8]" />
            <div className="flex-1">
              <div className="text-sm font-medium">{plan.name}</div>
              <div className="text-xs text-white/60">{formatPrice(plan.price, plan.period)} per {plan.period}</div>
            </div>
            {plan.savings && (
              <div className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-medium">{plan.savings}</div>
            )}
          </div>

          <div className="text-xs uppercase tracking-[2.5px] text-white/50 mb-3 px-1">PAYMENT METHODS</div>

          <div className="space-y-2 mb-8">
            {PAYMENT_METHODS.map((method) => {
              // Better matching for selection
              const methodDisplay = method.id === 'visa' ? 'Visa •••• 4242' : 
                                   method.id === 'mastercard' ? 'Mastercard •••• 1881' : 
                                   method.id === 'paypal' ? 'PayPal' : 'Apple Pay'
              const isSelected = selectedMethod === methodDisplay || 
                                 (method.id === 'visa' && selectedMethod.includes('4242')) ||
                                 (method.id === 'mastercard' && selectedMethod.includes('1881')) ||
                                 selectedMethod === method.label

              return (
                <button
                  key={method.id}
                  onClick={() => {
                    const display = method.id === 'visa' ? 'Visa •••• 4242' :
                                    method.id === 'mastercard' ? 'Mastercard •••• 1881' : 
                                    method.id === 'paypal' ? 'PayPal' : 'Apple Pay'
                    setSelectedMethod(display)
                  }}
                  className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl border transition-all text-left active:scale-[0.985]
                    ${isSelected 
                      ? 'bg-white/10 border-[#7460e1] ring-1 ring-[#7460e1]/40' 
                      : 'bg-white/5 border-white/10 hover:border-white/25'}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#a8a1d8]">
                    {method.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{method.label}</div>
                    <div className="text-sm text-white/60 truncate">{method.detail}</div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 transition ${isSelected ? 'border-[#7460e1] bg-[#7460e1]' : 'border-white/30'}`}>
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                </button>
              )
            })}
          </div>

          <button 
            onClick={() => alert('(Prototype) Add new payment method flow would open here.')}
            className="text-sm text-[#a8a1d8] flex items-center gap-1.5 mb-8 active:opacity-70"
          >
            + Add new payment method <ChevronRight className="w-4 h-4" />
          </button>

          <div className="mt-auto pb-5">
            <button 
              onClick={handleChooseMethodContinue}
              disabled={!selectedMethod}
              className="w-full py-4 rounded-2xl bg-[#7460e1] disabled:opacity-50 active:bg-[#6652d1] font-semibold text-lg tracking-[-0.2px] transition active:scale-[0.985]"
            >
              Continue to Confirm
            </button>
            <div className="text-center text-[10px] text-white/40 mt-3">Payments secured with 256-bit encryption</div>
          </div>
        </div>
      )
    }

    // ========== OVERVIEW (default) ==========
    return (
      <div className="h-full flex flex-col pt-9 px-5 text-white overflow-y-auto pb-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <button 
            onClick={() => onNavigate?.('profile')} 
            className="flex items-center gap-1.5 text-sm text-white/70 active:text-white px-2 py-1 -ml-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="text-xl font-semibold tracking-tight">Subscription</div>
          <div className="w-9" />
        </div>

        {/* Current Status */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="uppercase tracking-[2.5px] text-xs text-white/50">CURRENT STATUS</div>
            {isPro && (
              <div className="text-xs px-3 py-px rounded-full bg-gradient-to-r from-[#7460e1] to-violet-600 text-white font-medium">PRO MEMBER</div>
            )}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-5">
            {isPro && currentPlanDetails ? (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7460e1] to-violet-600 flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold tracking-tight">{getPlanDisplayName(currentPlan)}</div>
                    <div className="text-[#a8a1d8] text-sm">Active • Next billing in 21 days</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                  <div className="bg-white/5 rounded-2xl p-3">
                    <div className="text-white/50 text-xs">PRICE</div>
                    <div className="font-semibold mt-0.5 tabular-nums">
                      ${currentPlan === 'pro-yearly' ? '99' : '9.99'} <span className="text-xs font-normal text-white/50">/ {currentPlan === 'pro-yearly' ? 'yr' : 'mo'}</span>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-3">
                    <div className="text-white/50 text-xs">PAYMENT METHOD</div>
                    <div className="font-medium mt-0.5 truncate">{currentPaymentMethod}</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => setStep('choose-method')}
                    className="flex-1 py-3 rounded-2xl border border-white/15 text-sm font-medium active:bg-white/5 transition"
                  >
                    Manage Payment
                  </button>
                  <button 
                    onClick={() => handleSelectPlan(currentPlan === 'pro-monthly' ? 'pro-yearly' : 'pro-monthly')}
                    className="flex-1 py-3 rounded-2xl bg-white/10 text-sm font-medium active:bg-white/15 transition"
                  >
                    Switch Plan
                  </button>
                </div>

                {/* High-value edge case entry — distinct cancel flow */}
                <button
                  onClick={() => onNavigate?.('subscription-cancel')}
                  className="mt-2 w-full text-center text-xs py-2 text-red-400/90 hover:text-red-400 active:text-red-300 transition font-medium"
                >
                  Cancel subscription instead →
                </button>
              </div>
            ) : (
              <div className="text-center py-2">
                <Shield className="mx-auto w-10 h-10 text-white/40 mb-3" />
                <div className="font-medium mb-1">You are on the Free plan</div>
                <div className="text-sm text-white/60">Upgrade to unlock premium features</div>
              </div>
            )}
          </div>
        </div>

        {/* Upgrade / Plans Section */}
        <div className="mb-3 px-1 flex items-center justify-between">
          <div className="uppercase tracking-[2.5px] text-xs text-white/50">CHOOSE YOUR PLAN</div>
          {isPro && <div className="text-[10px] text-emerald-400">CURRENT PLAN HIGHLIGHTED</div>}
        </div>

        {/* Monthly Plan Card */}
        <button 
          onClick={() => handleSelectPlan('pro-monthly')}
          className={`w-full mb-3 rounded-3xl p-5 text-left border transition-all active:scale-[0.985] ${currentPlan === 'pro-monthly' 
            ? 'border-[#7460e1] bg-[#7460e1]/10' 
            : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="font-semibold text-xl tracking-tight">Pro Monthly</div>
              <div className="text-sm text-white/60">Billed monthly • Cancel anytime</div>
            </div>
            <div className="text-right">
              <div className="font-mono text-3xl font-semibold tabular-nums tracking-[-1px]">$9.99</div>
              <div className="text-xs -mt-0.5 text-white/50">per month</div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-sm">
            <div className="flex gap-4 text-white/70">
              <div className="flex items-center gap-1"><Check className="w-4 h-4" /> Unlimited</div>
              <div className="flex items-center gap-1"><Check className="w-4 h-4" /> Priority</div>
            </div>
            <div className={`text-xs font-medium px-3 py-1 rounded-full ${currentPlan === 'pro-monthly' ? 'bg-[#7460e1] text-white' : 'bg-white/10 text-white/70'}`}>
              {currentPlan === 'pro-monthly' ? 'CURRENT' : 'SELECT'}
            </div>
          </div>
        </button>

        {/* Yearly Plan Card — Recommended */}
        <button 
          onClick={() => handleSelectPlan('pro-yearly')}
          className={`w-full mb-6 rounded-3xl p-5 text-left border transition-all active:scale-[0.985] relative overflow-hidden ${currentPlan === 'pro-yearly' 
            ? 'border-[#7460e1] bg-[#7460e1]/10' 
            : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
        >
          <div className="absolute top-4 right-4 text-[10px] tracking-widest px-2.5 py-px rounded-full bg-emerald-500/20 text-emerald-400 font-medium">BEST VALUE</div>
          
          <div className="flex justify-between items-start">
            <div>
              <div className="font-semibold text-xl tracking-tight">Pro Yearly</div>
              <div className="text-sm text-emerald-400 font-medium">Save 17% — only $8.25/mo</div>
            </div>
            <div className="text-right">
              <div className="font-mono text-3xl font-semibold tabular-nums tracking-[-1px]">$99</div>
              <div className="text-xs -mt-0.5 text-white/50">per year</div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-sm">
            <div className="flex gap-4 text-white/70">
              <div className="flex items-center gap-1"><Check className="w-4 h-4" /> All Pro</div>
              <div className="flex items-center gap-1"><Star className="w-4 h-4" /> Early access</div>
            </div>
            <div className={`text-xs font-medium px-3 py-1 rounded-full ${currentPlan === 'pro-yearly' ? 'bg-[#7460e1] text-white' : 'bg-white/10 text-white/70'}`}>
              {currentPlan === 'pro-yearly' ? 'CURRENT' : 'SELECT'}
            </div>
          </div>
        </button>

        {/* Trust footer */}
        <div className="text-center text-[11px] text-white/40 mt-auto pb-4">
          30-day money-back guarantee • Cancel anytime • Secure checkout
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-[#18153a] text-white">
      {renderContent()}

      {/* Bottom Navigation — consistent with app */}
      <BottomNav 
        active="profile" 
        onChange={(tab) => onNavigate?.(tab)} 
      />
    </div>
  )
}
