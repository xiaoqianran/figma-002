/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, type ReactNode } from 'react'

export type LabView = 'connected' | 'speedtest' | 'servers' | 'profile' | 'stats' | 'subscription' | 'edit-profile' | 'change-password' | 'logout' | 'stats-empty' | 'settings' | 'subscription-cancel' | 'welcome'

export interface Server {
  id: string
  name: string
  country: string
  flag: string
  ping: number
  load: number
}

export interface UserProfile {
  name: string
  email: string
  avatarUrl?: string
  isPro: boolean
}

export interface SpeedtestResult {
  ping: number
  download: number
  upload: number
  timestamp: number
}

export type SubscriptionPlan = 'free' | 'pro-monthly' | 'pro-yearly'

interface AppState {
  isConnected: boolean
  currentServer: Server
  userProfile: UserProfile
  connectionTime: number
  servers: Server[]
  latestSpeedtest?: SpeedtestResult
  currentPlan: SubscriptionPlan
  currentPaymentMethod: string
  // Lab navigation (persisted + central for Prototype Lab)
  labView: LabView
  // Increments on reset to force remount of phone screens (clears all local component state without reload)
  resetKey: number
}

interface AppActions {
  connect: () => void
  disconnect: () => void
  changeServer: (server: Server) => void
  updateProfile: (updates: Partial<UserProfile>) => void
  recordSpeedtestResult: (result: Omit<SpeedtestResult, 'timestamp'>) => void
  upgradeToPlan: (plan: 'pro-monthly' | 'pro-yearly') => void
  downgradeToFree: () => void
  setPaymentMethod: (method: string) => void
  setLabView: (view: LabView) => void
  resetDemoState: () => void
}

export const defaultServers: Server[] = [
  { id: 'sg', name: 'Singapore', country: 'Singapore', flag: '🇸🇬', ping: 12, load: 34 },
  { id: 'jp', name: 'Tokyo', country: 'Japan', flag: '🇯🇵', ping: 28, load: 67 },
  { id: 'us-w', name: 'Los Angeles', country: 'USA', flag: '🇺🇸', ping: 68, load: 42 },
  { id: 'nl', name: 'Amsterdam', country: 'Netherlands', flag: '🇳🇱', ping: 45, load: 29 },
  { id: 'hk', name: 'Hong Kong', country: 'Hong Kong', flag: '🇭🇰', ping: 19, load: 55 },
]

const defaultProfile: UserProfile = {
  name: 'Alex Chen',
  email: 'alex.chen@personal.com',
  isPro: true,
}

// --- Simple localStorage persistence for demo progress (no full reload loss) ---
const STORAGE_KEY = 'yeki-lab-demo-state'

interface PersistedState {
  isConnected: boolean
  currentServerId: string
  userProfile: UserProfile
  connectionTime: number
  latestSpeedtest?: SpeedtestResult
  currentPlan: SubscriptionPlan
  currentPaymentMethod: string
  labView: LabView
}

function loadPersistedState(): Partial<PersistedState> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const p = JSON.parse(raw)
    return p || {}
  } catch {
    return {}
  }
}

function savePersistedState(partial: Partial<PersistedState>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(partial))
  } catch {
    // Silently ignore storage quota / private mode issues in demo
  }
}

const AppStateContext = createContext<(AppState & AppActions) | null>(null)

export function AppStateProvider({ children }: { children: ReactNode }) {
  // Hydrate from localStorage for seamless refresh persistence in the Prototype Lab
  const persisted = loadPersistedState()

  const [resetKey, setResetKey] = useState(0)
  const [labView, setLabView] = useState<LabView>(persisted.labView || 'connected')
  const [isConnected, setIsConnected] = useState<boolean>(persisted.isConnected ?? true)
  const [currentServer, setCurrentServer] = useState<Server>(
    () => defaultServers.find(s => s.id === persisted.currentServerId) || defaultServers[0]
  )
  const [userProfile, setUserProfile] = useState<UserProfile>(persisted.userProfile || defaultProfile)
  const [connectionTime, setConnectionTime] = useState<number>(persisted.connectionTime ?? 1302)
  const [latestSpeedtest, setLatestSpeedtest] = useState<SpeedtestResult | undefined>(persisted.latestSpeedtest)
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan>(persisted.currentPlan || 'pro-monthly')
  const [currentPaymentMethod, setCurrentPaymentMethod] = useState<string>(persisted.currentPaymentMethod || 'Visa •••• 4242')

  // Real ticking timer when connected
  React.useEffect(() => {
    if (!isConnected) return

    const interval = setInterval(() => {
      setConnectionTime(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [isConnected])

  // Auto-persist key demo state so page refresh never loses Lab progress
  React.useEffect(() => {
    savePersistedState({
      isConnected,
      currentServerId: currentServer.id,
      userProfile,
      connectionTime,
      latestSpeedtest,
      currentPlan,
      currentPaymentMethod,
      labView,
    })
  }, [isConnected, currentServer, userProfile, connectionTime, latestSpeedtest, currentPlan, currentPaymentMethod, labView])

  const connect = () => setIsConnected(true)
  const disconnect = () => setIsConnected(false)

  const changeServer = (server: Server) => {
    setCurrentServer(server)
    if (isConnected) {
      setConnectionTime(0)
    }
  }

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updates }))
  }

  const recordSpeedtestResult = (result: Omit<SpeedtestResult, 'timestamp'>) => {
    setLatestSpeedtest({
      ...result,
      timestamp: Date.now(),
    })
  }

  const upgradeToPlan = (plan: 'pro-monthly' | 'pro-yearly') => {
    setCurrentPlan(plan)
    setUserProfile(prev => ({ ...prev, isPro: true }))
  }

  const downgradeToFree = () => {
    setCurrentPlan('free')
    setUserProfile(prev => ({ ...prev, isPro: false }))
  }

  const setPaymentMethod = (method: string) => {
    setCurrentPaymentMethod(method)
  }

  const resetDemoState = () => {
    // Proper full reset of ALL key global demo state — replaces any prior reload-based reset.
    // Covers: connection, server, speeds, subscription, profile edits, speedtest results, payment, lab view, etc.
    const cleanServer = defaultServers[0]
    const cleanProfile = defaultProfile

    setIsConnected(true)
    setCurrentServer(cleanServer)
    setUserProfile(cleanProfile)
    setConnectionTime(47) // clean, realistic starting session for demo
    setLatestSpeedtest(undefined)
    setCurrentPlan('pro-monthly')
    setCurrentPaymentMethod('Visa •••• 4242')
    setLabView('connected')
    setResetKey(k => k + 1) // forces all Lab screens + PhoneFrame to remount → wipes local useState (speedtest phases, edit forms, sub wizard, etc.)

    // Immediately persist clean slate
    savePersistedState({
      isConnected: true,
      currentServerId: cleanServer.id,
      userProfile: cleanProfile,
      connectionTime: 47,
      latestSpeedtest: undefined,
      currentPlan: 'pro-monthly',
      currentPaymentMethod: 'Visa •••• 4242',
      labView: 'connected',
    })
  }

  const value: AppState & AppActions = {
    isConnected,
    currentServer,
    userProfile,
    connectionTime,
    servers: defaultServers,
    latestSpeedtest,
    currentPlan,
    currentPaymentMethod,
    labView,
    resetKey,
    connect,
    disconnect,
    changeServer,
    updateProfile,
    recordSpeedtestResult,
    upgradeToPlan,
    downgradeToFree,
    setPaymentMethod,
    setLabView,
    resetDemoState,
  }

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  )
}

export function useAppState() {
  const context = useContext(AppStateContext)
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider')
  }
  return context
}
