import { useEffect, useState } from 'react'
import { useAppState } from '../lib/useAppState'
import { BottomNav } from '../components/BottomNav'

interface ConnectedScreenProps {
  onNavigate?: (tab: 'home' | 'server' | 'speedtest' | 'stats' | 'profile' | 'subscription' | 'edit-profile' | 'change-password' | 'logout' | 'stats-empty') => void
}

export function ConnectedScreen({ onNavigate }: ConnectedScreenProps) {
  const { 
    isConnected, 
    currentServer, 
    connectionTime, 
    disconnect, 
    connect 
  } = useAppState()

  const [liveUpload, setLiveUpload] = useState(2.47)
  const [liveDownload, setLiveDownload] = useState(5.23)

  // Live speed simulation
  useEffect(() => {
    if (!isConnected) return

    const interval = setInterval(() => {
      setLiveUpload(prev => Math.max(1.8, Math.min(3.4, prev + (Math.random() - 0.5) * 0.3)))
      setLiveDownload(prev => Math.max(4.1, Math.min(6.8, prev + (Math.random() - 0.5) * 0.4)))
    }, 1200)

    return () => clearInterval(interval)
  }, [isConnected])

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60)
    const sec = seconds % 60
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
  }

  const ping = currentServer.ping

  return (
    <div className="h-full flex flex-col pt-11 px-5 text-white">
      {/* Top Logo */}
      <div className="flex justify-center mb-1">
        <div className="w-7 h-7 bg-[#7460e1] rounded-md flex items-center justify-center ring-1 ring-white/20">
          <span className="text-[13px] font-black tracking-tighter -mt-px">Y</span>
        </div>
      </div>

      <div className="text-center mt-3">
        <div className="uppercase tracking-[3.5px] text-[11px] text-[#a8a1d8] font-medium">
          {isConnected ? 'CONNECTED' : 'DISCONNECTED'}
        </div>
        <div className="text-[56px] font-semibold tracking-[-4px] mt-0.5 tabular-nums font-mono">
          {formatTime(connectionTime)}
        </div>
        <div className="text-[#d2b36e] text-[12px] mt-0.5 tracking-[-0.2px]">
          {isConnected ? "You have 1 hour and 49 minutes left" : "Tap button to connect"}
        </div>
      </div>

      {/* Big Control Button */}
      <div className="flex justify-center my-7">
        <button 
          onClick={isConnected ? disconnect : connect}
          className={`w-[130px] h-[130px] rounded-full active:scale-[0.965] transition-all duration-150 flex items-center justify-center
            ${isConnected 
              ? 'bg-[#a89be8] shadow-[0_0_0_12px_#a89be820]' 
              : 'bg-white/15 border-[3px] border-white/30'}`}
        >
          <div className="w-[100px] h-[100px] bg-white rounded-full flex items-center justify-center shadow-xl">
            <div className={`w-[34px] h-[34px] rounded-[5px] transition-all ${isConnected ? 'bg-[#2a2554]' : 'bg-emerald-600'}`} />
          </div>
        </button>
      </div>

      {/* Spacer to push the Test Status bar (server speed card) toward the bottom */}
      <div className="flex-1" />

      {/* Server Card - now dynamic */}
      <div className="mx-4 bg-white rounded-2xl p-4 text-black shadow-2xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-red-600 rounded-full flex items-center justify-center ring-1 ring-red-300/50">
              <span className="text-[10px] text-white font-black tracking-tighter">{currentServer.flag}</span>
            </div>
            <div>
              <div className="font-semibold text-[15px] tracking-[-0.3px]">{currentServer.name}</div>
              <div className="text-emerald-600 text-[11px] -mt-0.5 flex items-center gap-1.5">
                <span>{ping}ms</span>
                <span className="text-emerald-400">•</span>
                <span>优选</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => onNavigate?.('server')}
            className="text-[12px] font-semibold px-4 py-1 bg-[#7460e1] hover:bg-[#6652d1] text-white rounded-full active:scale-95 transition"
          >
            Change
          </button>
        </div>

        <div className="grid grid-cols-2 gap-x-4 mt-4 pt-4 border-t text-sm">
          <div>
            <div className="text-emerald-600 flex items-center gap-1 text-[11px]">
              <span>↑</span> <span>Upload</span>
            </div>
            <div className="font-semibold tabular-nums text-[15px]">
              {liveUpload.toFixed(2)} <span className="font-normal text-xs text-gray-400">Mbps</span>
            </div>
          </div>
          <div>
            <div className="text-sky-600 flex items-center gap-1 text-[11px]">
              <span>↓</span> <span>Download</span>
            </div>
            <div className="font-semibold tabular-nums text-[15px]">
              {liveDownload.toFixed(2)} <span className="font-normal text-xs text-gray-400">Mbps</span>
            </div>
          </div>
        </div>
      </div>

      <BottomNav 
        active="home" 
        onChange={(tab) => onNavigate?.(tab)} 
      />
    </div>
  )
}
