import { useState, useEffect, useRef } from 'react'
import { useAppState } from '../lib/useAppState'
import { BottomNav } from '../components/BottomNav'
import { ArrowDown, ArrowUp, Zap, Play, RotateCcw } from 'lucide-react'

interface SpeedtestScreenProps {
  onNavigate?: (tab: 'home' | 'server' | 'speedtest' | 'stats' | 'profile' | 'subscription' | 'edit-profile' | 'change-password' | 'logout' | 'stats-empty') => void
}

type Phase = 'idle' | 'ping' | 'download' | 'upload' | 'done'

export function SpeedtestScreen({ onNavigate }: SpeedtestScreenProps) {
  const { currentServer, recordSpeedtestResult } = useAppState()

  const [phase, setPhase] = useState<Phase>('idle')
  const [progress, setProgress] = useState(0) // overall gauge 0-100
  const [livePing, setLivePing] = useState(0)
  const [liveDownload, setLiveDownload] = useState(0)
  const [liveUpload, setLiveUpload] = useState(0)

  const [finals, setFinals] = useState<{ ping: number; download: number; upload: number } | null>(null)
  const [elapsedMs, setElapsedMs] = useState(0)

  const targetsRef = useRef<{ ping: number; download: number; upload: number } | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Clean up timer
  const clearTestTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  // Generate realistic final results based on current server
  const generateTargets = () => {
    const basePing = currentServer.ping
    const targetPing = Math.max(4, Math.round(basePing + (Math.random() - 0.5) * 9))
    const targetDownload = parseFloat((38 + Math.random() * 58).toFixed(1))
    const targetUpload = parseFloat((9 + Math.random() * 41).toFixed(1))
    return { ping: targetPing, download: targetDownload, upload: targetUpload }
  }

  const startTest = () => {
    clearTestTimer()

    const targets = generateTargets()
    targetsRef.current = targets
    setFinals(targets)
    setPhase('ping')
    setProgress(0)
    setLivePing(4)
    setLiveDownload(0)
    setLiveUpload(0)
    setElapsedMs(0)

    const PING_DUR = 2350
    const DOWNLOAD_DUR = 4100
    const UPLOAD_DUR = 2950
    const TOTAL = PING_DUR + DOWNLOAD_DUR + UPLOAD_DUR

    let elapsed = 0

    timerRef.current = setInterval(() => {
      elapsed += 70
      const pct = Math.min(100, Math.round((elapsed / TOTAL) * 100))
      setProgress(pct)
      setElapsedMs(elapsed)

      // Determine current phase
      let currentPhase: 'ping' | 'download' | 'upload' = 'ping'
      let phaseElapsed = elapsed
      if (phaseElapsed > PING_DUR) {
        phaseElapsed -= PING_DUR
        currentPhase = 'download'
      }
      if (phaseElapsed > DOWNLOAD_DUR) {
        phaseElapsed -= DOWNLOAD_DUR
        currentPhase = 'upload'
      }

      if (currentPhase !== phase) {
        // Finalize the just-completed phase for crisp numbers
        if (phase === 'ping') setLivePing(targets.ping)
        if (phase === 'download') setLiveDownload(targets.download)
        setPhase(currentPhase)
      }

      // Live value updates with realistic jitter + ramp
      const t = targetsRef.current!
      const phasePct = Math.min(1, phaseElapsed / (currentPhase === 'ping' ? PING_DUR : currentPhase === 'download' ? DOWNLOAD_DUR : UPLOAD_DUR))

      if (currentPhase === 'ping') {
        // Ping: quick settle with small jitter
        const val = Math.round(3 + (t.ping - 3) * (phasePct * 0.92 + Math.random() * 0.11))
        setLivePing(Math.min(t.ping, Math.max(3, val)))
      } else if (currentPhase === 'download') {
        // Download: fast initial ramp then approach target
        const ramp = Math.pow(phasePct, 0.78)
        const jitter = (Math.random() - 0.5) * 1.8
        const val = parseFloat((0.8 + (t.download - 0.8) * ramp + jitter).toFixed(1))
        setLiveDownload(Math.min(t.download, Math.max(0.8, val)))
      } else {
        // Upload: steady ramp
        const ramp = Math.pow(phasePct, 0.85)
        const jitter = (Math.random() - 0.5) * 1.1
        const val = parseFloat((0.4 + (t.upload - 0.4) * ramp + jitter).toFixed(1))
        setLiveUpload(Math.min(t.upload, Math.max(0.4, val)))
      }

      if (elapsed >= TOTAL - 40) {
        clearTestTimer()
        // Lock finals
        setLivePing(t.ping)
        setLiveDownload(t.download)
        setLiveUpload(t.upload)
        setProgress(100)
        setPhase('done')
        setElapsedMs(TOTAL)

        // Persist to global state
        recordSpeedtestResult({
          ping: t.ping,
          download: t.download,
          upload: t.upload,
        })
      }
    }, 70)
  }

  const resetToIdle = () => {
    clearTestTimer()
    setPhase('idle')
    setProgress(0)
    setLivePing(0)
    setLiveDownload(0)
    setLiveUpload(0)
    setFinals(null)
    setElapsedMs(0)
    targetsRef.current = null
  }

  // Click handler for the big circle
  const handleCircleClick = () => {
    if (phase === 'idle' || phase === 'done') {
      startTest()
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTestTimer()
  }, [])

  // Format helpers
  const formatSpeed = (n: number, isMbps = true) => {
    if (isMbps) return n.toFixed(1)
    return Math.round(n).toString()
  }

  const getMainValue = () => {
    if (phase === 'ping') return formatSpeed(livePing, false)
    if (phase === 'download') return formatSpeed(liveDownload)
    if (phase === 'upload') return formatSpeed(liveUpload)
    if (phase === 'done' && finals) return formatSpeed(finals.download) // hero the download in done
    return '—'
  }

  const getMainUnit = () => {
    if (phase === 'ping') return 'ms'
    return 'Mbps'
  }

  const getPhaseLabel = () => {
    if (phase === 'ping') return 'Pinging server…'
    if (phase === 'download') return 'Testing download…'
    if (phase === 'upload') return 'Testing upload…'
    if (phase === 'done') return 'Test complete'
    return ''
  }

  const isPhaseActive = (p: 'download' | 'upload' | 'ping') => {
    if (phase === 'done') return false
    if (p === 'download' && (phase === 'download' || phase === 'upload')) return true
    if (p === 'upload' && phase === 'upload') return true
    if (p === 'ping' && phase === 'ping') return true
    return false
  }

  const getRowValue = (type: 'download' | 'upload' | 'ping') => {
    if (phase === 'idle') return '—'
    if (type === 'download') {
      if (phase === 'ping') return 'Waiting'
      return `${formatSpeed(liveDownload)} Mbps`
    }
    if (type === 'upload') {
      if (phase === 'ping' || phase === 'download') return phase === 'download' ? 'Testing…' : 'Waiting'
      return `${formatSpeed(liveUpload)} Mbps`
    }
    // ping
    if (phase === 'ping') return `${formatSpeed(livePing, false)} ms`
    if (phase === 'done' && finals) return `${finals.ping} ms`
    return finals ? `${finals.ping} ms` : 'Waiting'
  }

  const getRating = () => {
    if (!finals) return null
    const { ping, download } = finals
    if (ping <= 18 && download >= 55) return { label: 'EXCELLENT', color: 'text-emerald-400' }
    if (ping <= 35 && download >= 35) return { label: 'VERY GOOD', color: 'text-sky-400' }
    return { label: 'GOOD', color: 'text-amber-400' }
  }

  const rating = getRating()

  // Server display
  const serverDisplay = currentServer

  return (
    <div className="h-full flex flex-col pt-9 text-white bg-[#18153a]">
      {/* Top header */}
      <div className="px-5 pt-2 text-center">
        <div className="text-[10px] tracking-[3px] text-white/50 font-medium">SPEED TEST</div>
        <div className="text-[28px] font-semibold tracking-[-1.2px] mt-0.5" style={{ fontFamily: "'Clash Display', system-ui, sans-serif" }}>
          Speedtest
        </div>
      </div>

      {/* Main circular gauge / Start button area */}
      <div className="flex justify-center mt-5 mb-1">
        <div 
          onClick={handleCircleClick}
          className={`relative w-[252px] h-[252px] rounded-full flex items-center justify-center cursor-pointer select-none active:scale-[0.985] transition-all duration-150
            ${phase === 'idle' || phase === 'done' ? 'hover:scale-[1.015]' : ''}`}
        >
          {/* Outer decorative rings (matching Figma premium feel) */}
          <div className="absolute inset-0 rounded-full border-[14px] border-[#3d3664]/60" />
          <div className="absolute inset-[13px] rounded-full border-[9px] border-[#7460e1]/20" />

          {/* SVG Progress Gauge — top arc style inspired by Figma */}
          {phase !== 'idle' && phase !== 'done' && (
            <svg className="absolute inset-0 -rotate-[18deg]" width="252" height="252" viewBox="0 0 252 252">
              {/* Background arc track */}
              <circle
                cx="126" cy="126" r="103"
                fill="none"
                stroke="#3a345f"
                strokeWidth="18"
                strokeDasharray="324"
                strokeDashoffset="92"
                strokeLinecap="round"
              />
              {/* Active progress arc */}
              <circle
                cx="126" cy="126" r="103"
                fill="none"
                stroke="#a8a1d8"
                strokeWidth="18"
                strokeDasharray="324"
                strokeDashoffset={324 - (232 * (progress / 100))}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 70ms linear' }}
              />
            </svg>
          )}

          {/* Inner circle content */}
          <div className={`relative z-10 w-[190px] h-[190px] rounded-full flex flex-col items-center justify-center
            ${phase === 'idle' || phase === 'done' 
              ? 'bg-[#a89be8] shadow-[0_0_0_18px_#a89be820] text-[#2c2a4a]' 
              : 'bg-[#25214a] border border-white/10'}`}>
            
            {phase === 'idle' || phase === 'done' ? (
              <div className="flex flex-col items-center">
                {phase === 'done' ? (
                  <RotateCcw size={42} className="mb-1.5" />
                ) : (
                  <Play size={44} className="ml-0.5 mb-1" />
                )}
                <div className="font-semibold text-[27px] tracking-[-1px] leading-none" style={{ fontFamily: "'Clash Display', system-ui, sans-serif" }}>
                  {phase === 'done' ? 'AGAIN' : 'START'}
                </div>
              </div>
            ) : (
              <>
                <div className="text-[42px] font-semibold tabular-nums tracking-[-2.5px] leading-none mt-1" style={{ fontFamily: "'Clash Display', system-ui, sans-serif" }}>
                  {getMainValue()}
                </div>
                <div className="text-[13px] text-white/70 tracking-wide -mt-1">{getMainUnit()}</div>

                {/* Small live indicator dot */}
                <div className="mt-2 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#a8a1d8] animate-pulse" />
                  <div className="text-[10px] text-white/50 uppercase tracking-[1.5px]">LIVE</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Phase label + progress meta */}
      <div className="text-center h-5 mb-1">
        {phase !== 'idle' && (
          <div className="text-xs text-white/60 tracking-[1px]">
            {getPhaseLabel()} {phase !== 'done' && `· ${(elapsedMs / 1000).toFixed(1)}s`}
          </div>
        )}
        {phase === 'done' && rating && (
          <div className={`text-xs font-semibold tracking-[1.5px] ${rating.color}`}>{rating.label}</div>
        )}
      </div>

      {/* Server selector bar (matches Figma layout) */}
      <div className="mx-5 mt-3">
        <div className="bg-white/5 backdrop-blur rounded-3xl px-4 py-[15px] flex items-center justify-between border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-xl ring-1 ring-white/20">
              {serverDisplay.flag}
            </div>
            <div>
              <div className="font-medium tracking-[-0.2px]">{serverDisplay.name}</div>
              <div className="text-[11px] text-white/50 -mt-px">{serverDisplay.country}</div>
            </div>
          </div>
          <button
            onClick={() => onNavigate?.('server')}
            disabled={phase === 'ping' || phase === 'download' || phase === 'upload'}
            className="px-5 py-1.5 text-sm font-semibold rounded-2xl border border-white/20 active:bg-white/5 disabled:opacity-40 transition disabled:cursor-not-allowed"
          >
            Change
          </button>
        </div>
      </div>

      {/* Results / Status panel — the key rich data area */}
      <div className="mx-5 mt-4 flex-1">
        {phase === 'idle' ? (
          /* Off / Idle empty state matching Figma */
          <div className="bg-white/5 rounded-3xl px-6 py-7 text-center border border-white/10">
            <div className="mx-auto mb-4 w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center">
              <div className="text-[#a8a1d8]">
                <Zap size={22} />
              </div>
            </div>
            <div className="text-[22px] font-semibold tracking-tight text-white/95" style={{ fontFamily: "'Clash Display', system-ui, sans-serif" }}>
              Press Start!
            </div>
            <p className="mt-2 text-sm leading-snug text-white/60 max-w-[260px] mx-auto">
              Real multi-phase speed test. Tap the button above to measure Ping, Download and Upload on {serverDisplay.name}.
            </p>
          </div>
        ) : (
          /* Progress + Done: the 3-row rich results list */
          <div className="bg-white/5 rounded-3xl border border-white/10 px-1 py-1">
            {/* Download row */}
            <div className={`flex items-center justify-between px-5 py-[13px] rounded-3xl mx-1 transition-all ${isPhaseActive('download') ? 'bg-white/10' : ''}`}>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center ${isPhaseActive('download') ? 'bg-[#7460e1] text-white' : 'bg-white/10 text-white/70'}`}>
                  <ArrowDown size={18} />
                </div>
                <div className="font-medium text-[15px]">Download</div>
              </div>
              <div className={`tabular-nums font-semibold text-lg tracking-[-0.4px] ${isPhaseActive('download') ? 'text-[#a8a1d8]' : 'text-white/90'}`}>
                {getRowValue('download')}
              </div>
            </div>

            <div className="mx-5 h-px bg-white/10" />

            {/* Upload row */}
            <div className={`flex items-center justify-between px-5 py-[13px] rounded-3xl mx-1 transition-all ${isPhaseActive('upload') ? 'bg-white/10' : ''}`}>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center ${isPhaseActive('upload') ? 'bg-[#7460e1] text-white' : 'bg-white/10 text-white/70'}`}>
                  <ArrowUp size={18} />
                </div>
                <div className="font-medium text-[15px]">Upload</div>
              </div>
              <div className={`tabular-nums font-semibold text-lg tracking-[-0.4px] ${isPhaseActive('upload') ? 'text-[#a8a1d8]' : 'text-white/90'}`}>
                {getRowValue('upload')}
              </div>
            </div>

            <div className="mx-5 h-px bg-white/10" />

            {/* Ping row */}
            <div className={`flex items-center justify-between px-5 py-[13px] rounded-3xl mx-1 transition-all ${isPhaseActive('ping') ? 'bg-white/10' : ''}`}>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center ${isPhaseActive('ping') ? 'bg-[#7460e1] text-white' : 'bg-white/10 text-white/70'}`}>
                  <Zap size={18} />
                </div>
                <div className="font-medium text-[15px]">Ping</div>
              </div>
              <div className={`tabular-nums font-semibold text-lg tracking-[-0.4px] ${isPhaseActive('ping') ? 'text-[#a8a1d8]' : 'text-white/90'}`}>
                {getRowValue('ping')}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom actions / info when done */}
      {phase === 'done' && (
        <div className="px-5 pb-2 text-center">
          <button 
            onClick={resetToIdle}
            className="text-xs text-white/50 active:text-white/70 underline-offset-2 hover:underline"
          >
            Reset view
          </button>
          <div className="text-[10px] text-white/40 mt-1 tracking-wider">Results saved to Statistics</div>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNav 
        active="speedtest" 
        onChange={(tab) => onNavigate?.(tab)} 
      />
    </div>
  )
}
